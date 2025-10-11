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
