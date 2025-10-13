import { Router } from 'express';
import { login, register, resendVerification, verifyEmail, whoami } from './auth.controller.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { campistaSchema, campistaUpdateSchema } from '../usuarios/campista.schema.js';
import {
  validateSchema,
  validateSchemaByRole,
} from '../shared/middleware/validation.middleware.js';
import { instructorUpdateSchema } from '../usuarios/instructor.schema.js';
import { adminUpdateSchema } from '../usuarios/admin.schema.js';

export const authRoutes = Router();
//Rutas Publicas
authRoutes.post('/register', register);
authRoutes.get('/verify-email/:token', verifyEmail);
authRoutes.put('/resend-verification', resendVerification);
authRoutes.post('/login', login);

//Rutas Privadas
authRoutes.get('/me', authMiddleware, whoami);
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
authRoutes.get('/profile', authMiddleware, authController.getProfile.bind(authController));
authRoutes.patch(
  '/profile',
  authMiddleware,
  validateSchemaByRole({
    campista: campistaUpdateSchema,
    instructor: instructorUpdateSchema,
    admin: adminUpdateSchema,
  }),
  authController.updateProfile.bind(authController),
);
