import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findByMail } from '../usuarios/usuarios.controler.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

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

    const { user, role } = result;

    // verificar contraseña (asumiendo que user.contrasena está hasheada con bcrypt)
    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // generar token
    const token = jwt.sign({ id: user.id, email: user.email, role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, {
      httpOnly: true, // no accesible desde JS (XSS safe)
      secure: true, // requiere HTTPS en prod
      sameSite: 'strict', // protege contra CSRF
      maxAge: 1000 * 60 * 60, // 1 hora
    });
    res.json({ message: 'Login exitoso' });
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
