import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findByMail } from '../usuarios/usuarios.controler.js';
import { Campista } from '../usuarios/campista.entity.js';
import { orm } from '../shared/db/orm.js';
import { sendVerificationEmail } from './email.service.js';

const JWT_SECRET = (process.env.JWT_SECRET as string) || 'supersecret';

const em = orm.em;

export async function register(req: Request, res: Response) {
  try {
    const { contrasena, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const token = crypto.randomUUID();
    const campista = em.create(Campista, {
      ...rest,
      contrasena: hashedPassword,
      isVerified: false,
      verificationToken: token,
    });
    await em.flush();
    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;
    console.log('Enviar este link al email:', verificationUrl);
    await sendVerificationEmail(campista.email, verificationUrl);
    res.status(201).json({ message: 'Usuario creado. Revisá tu correo para verificarlo.' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Unknown error', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;
  console.log('Token de verificación recibido:', token);

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ message: 'Token inválido' });
  }
  const user = await em.findOne(Campista, { verificationToken: token });
  if (!user) {
    return res.status(400).json({ message: 'Token inválido o expirado' });
  }

  user.isVerified = true;
  user.verificationToken = null;
  await orm.em.persistAndFlush(user);

  res.json({ message: 'Correo verificado con éxito.' });
};

export async function login(req: Request, res: Response) {
  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ message: 'Email y contraseña requeridos' });
    }

    const result = await findByMail(email);
    if (!result) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    if (result.user.isVerified === false) {
      return res
        .status(403)
        .json({ message: 'Por favor, verifica tu email antes de iniciar sesión.' });
    }

    const { user, role } = result;

    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role }, JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, /// ⚠️ false en localhost (solo true en HTTPS)
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
      path: '/', // disponible en toda la app
    });
    return res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        role,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.error('Unknown error', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}

export async function whoami(req: Request, res: Response) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    // verificar y decodificar token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };

    // buscar el usuario en la base de datos
    const user = await em.findOne(Campista, { id: decoded.id });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // devolver todos los datos relevantes del campista
    res.json({
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono,
      email: user.email,
      fechaNac: user.fechaNac,
      pais: user.pais,
      ciudad: user.ciudad,
      direccion: user.direccion,
      grupoSanguineo: user.grupoSanguineo,
      telefonoEmergencia: user.telefonoEmergencia,
      role: decoded.role,
    });
  } catch (error: unknown) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido' });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expirado' });
    } else if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.error('Unknown error', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}

export async function resendVerification(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Email inválido' });
    }
    const user = await em.findOne(Campista, { email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: 'El usuario ya está verificado' });
    }
    const token = crypto.randomUUID();
    user.verificationToken = token;
    await em.flush();
    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;
    console.log('Reenviar este link al email:', verificationUrl);
    await sendVerificationEmail(user.email, verificationUrl);
    res.json({ message: 'Correo de verificación reenviado. Revisá tu email.' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Unknown error', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}
