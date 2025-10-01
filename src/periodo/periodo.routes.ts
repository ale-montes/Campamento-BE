import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './periodo.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const periodoRoutes = Router();
//Rutas Publicas

periodoRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
periodoRoutes.get('/', findAll);
periodoRoutes.get('/:id', findOne);
periodoRoutes.post('/', add);
periodoRoutes.put('/:id', update);
periodoRoutes.patch('/:id', update);
periodoRoutes.delete('/:id', remove);
