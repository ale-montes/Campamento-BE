import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './instructor.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const instructorRoutes = Router();
//Rutas Publicas

instructorRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
instructorRoutes.get('/', findAll);
instructorRoutes.get('/:id', findOne);
instructorRoutes.post('/', add);
instructorRoutes.put('/:id', update);
instructorRoutes.patch('/:id', update);
instructorRoutes.delete('/:id', remove);
