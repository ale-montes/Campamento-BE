import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './mision.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const misionRoutes = Router();
//Rutas Publicas

misionRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
misionRoutes.get('/', findAll);
misionRoutes.get('/:id', findOne);
misionRoutes.post('/', add);
misionRoutes.put('/:id', update);
misionRoutes.patch('/:id', update);
misionRoutes.delete('/:id', remove);
