import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './admin.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const adminRoutes = Router();
//Rutas Publicas

adminRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
adminRoutes.get('/', findAll);
adminRoutes.get('/:id', findOne);
adminRoutes.post('/', add);
adminRoutes.put('/:id', update);
adminRoutes.patch('/:id', update);
adminRoutes.delete('/:id', remove);
