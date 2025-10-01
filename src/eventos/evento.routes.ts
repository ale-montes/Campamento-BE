import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './evento.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const eventoRoutes = Router();
//Rutas Publicas

eventoRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
eventoRoutes.get('/', findAll);
eventoRoutes.get('/:id', findOne);
eventoRoutes.post('/', add);
eventoRoutes.put('/:id', update);
eventoRoutes.patch('/:id', update);
eventoRoutes.delete('/:id', remove);
