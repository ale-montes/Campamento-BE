import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service.js';
import { CampistaInput } from '../usuarios/campista.schema.js';
import { getEm } from '../shared/db/orm.js';

export class AuthController {
  constructor(private readonly service = new AuthService()) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const em = getEm();
      const data: CampistaInput = req.body.sanitizedInput;
      await this.service.register(data, em);
      res.status(201).json({ message: 'Campista registrado correctamente' });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const em = getEm();
      const { email, contrasena } = req.body;
      const { token, role, user } = await this.service.login(email, contrasena, em);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 dias
        path: '/',
      });
      return res.status(200).json({
        message: 'Login exitoso',
        user: {
          id: user.id,
          nombre: user.nombre,
          role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async whoami(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.user;
      res.status(200).json({ message: 'Usuario identificado', data: token });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const em = getEm();
      const token = req.params.token as string;
      if (!token) throw new Error('Token no proporcionado');
      const result = await this.service.verifyEmail(token, em);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async resendVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const em = getEm();
      const { email } = req.body;
      await this.service.resendVerification(email, em);
      res.status(200).json({ message: 'Email de verificación reenviado' });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const em = getEm();
      const profile = await this.service.getProfile(req.user!, em);
      res.status(200).json({ message: 'Perfil obtenido', data: profile });
    } catch (error) {
      next(error);
    }
  }

  // PUT /profile
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const em = getEm();
      const { id, role } = req.user!;
      const updated = await this.service.updateProfile({ id, role }, req.body.sanitizedInput, em);
      res.status(200).json({ message: 'Perfil actualizado', data: updated });
    } catch (error) {
      next(error);
    }
  }
}

/*export const verifyEmail = async (req: Request, res: Response) => {
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

interface JwtPayload {
  id: number;
  email: string;
  role: 'campista' | 'instructor' | 'admin';
}

// tipo combinado de entidades posibles
type Usuario = Campista | Instructor | Admin;

export async function whoami(req: Request, res: Response): Promise<void> {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ message: 'No autenticado' });
      return;
    }

    // verificar token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    let user: Usuario | null = null;

    // buscar usuario según rol
    switch (decoded.role) {
      case 'campista':
        user = await em.findOne(Campista, { id: decoded.id });
        break;
      case 'instructor':
        user = await em.findOne(Instructor, { id: decoded.id });
        break;
      case 'admin':
        user = await em.findOne(Admin, { id: decoded.id });
        break;
      default:
        res.status(400).json({ message: 'Rol desconocido' });
        return;
    }

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // devolver datos relevantes (TypeScript-friendly)
    const {
      id,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      fechaNac,
      pais,
      ciudad,
      telefonoEmergencia,
      grupoSanguineo,
    } = user;

    res.json({
      id,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      fechaNac,
      pais,
      ciudad,
      telefonoEmergencia,
      grupoSanguineo,
      role: decoded.role,
    });
  } catch (error: unknown) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Token inválido' });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expirado' });
    } else if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      console.error('Error desconocido:', error);
      res.status(500).json({ message: 'Error desconocido' });
    }
  }
}*/
