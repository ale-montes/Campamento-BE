import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return res.status(401).json({ error: 'No autenticado' });

  try {
    const JWT_SECRET = (process.env.JWT_SECRET as string) || 'supersecret';
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode as { id: number; role: string; email: string };
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
