import { Router } from 'express';
import { login, register, resendVerification, verifyEmail, whoami } from './auth.controller.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';

export const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.get('/verify-email/:token', verifyEmail);
authRoutes.put('/resend-verification', resendVerification);
authRoutes.post('/login', login);
authRoutes.get('/me', authMiddleware, whoami);
//authRoutes.put('/logout', authMiddleware, logout);
//authRoutes.put('/update-profile', authMiddleware, updateProfile);
//authRoutes.put('/deactivate-account', authMiddleware, deactivateAccount);
//authRoutes.delete('/delete-account', authMiddleware, deleteAccount);
//authRoutes.get('/sessions', authMiddleware, listSessions);
//authRoutes.delete('/sessions/:id', authMiddleware, revokeSession);
