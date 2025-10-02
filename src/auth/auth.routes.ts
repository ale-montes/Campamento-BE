import { Router } from 'express';
import { login, register, resendVerification, verifyEmail, whoami } from './auth.controller.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';

export const authRoutes = Router();
//Rutas Publicas
authRoutes.post('/register', register);
authRoutes.get('/verify-email/:token', verifyEmail);
authRoutes.put('/resend-verification', resendVerification);
authRoutes.post('/login', login);

//Rutas Privadas
authRoutes.get('/me', authMiddleware, whoami);
