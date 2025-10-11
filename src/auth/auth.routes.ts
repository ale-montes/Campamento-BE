import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { campistaSchema, campistaUpdateSchema } from '../usuarios/campista.schema.js';
import { validateSchema } from '../shared/middleware/validation.middleware.js';

const authController = new AuthController();
export const authRoutes = Router();

authRoutes.post(
  '/register',
  validateSchema(campistaSchema),
  authController.register.bind(authController),
);

authRoutes.post(
  '/login',
  validateSchema(campistaUpdateSchema),
  authController.login.bind(authController),
);
authRoutes.get('/verify-email/:token', authController.verifyEmail.bind(authController));
authRoutes.put('/resend-verification', authController.resendVerification.bind(authController));

// Rutas protegidas
authRoutes.get('/me', authMiddleware, authController.whoami.bind(authController));
