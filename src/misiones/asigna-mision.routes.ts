import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './asigna-mision.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const asignaMisionRoutes = Router();
//Rutas Publicas

asignaMisionRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
asignaMisionRoutes.get('/', findAll);
asignaMisionRoutes.get('/:id', findOne);
asignaMisionRoutes.post('/', add);
asignaMisionRoutes.put('/:id', update);
asignaMisionRoutes.patch('/:id', update);
asignaMisionRoutes.delete('/:id', remove);
