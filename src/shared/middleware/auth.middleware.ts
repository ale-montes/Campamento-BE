import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/http-error.js';
import { UserPayload } from '../../types/user.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    //Obtener el token desde cookie o header
    const authHeader = req.headers.authorization;
    const token =
      req.cookies?.token || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined);

    if (!token) {
      throw new UnauthorizedError('No autenticado');
    }

    //Verificar token JWT
    const JWT_SECRET = (process.env.JWT_SECRET as string) || 'supersecret';
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & UserPayload;

    //Asignar el usuario decodificado a la request
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch {
    next(new UnauthorizedError('Token inválido o expirado'));
  }
};
