import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './solicitud-evento.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const solicitudEventoRoutes = Router();
//Rutas Publicas

solicitudEventoRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
solicitudEventoRoutes.get('/', findAll);
solicitudEventoRoutes.get('/:id', findOne);
solicitudEventoRoutes.post('/', add);
solicitudEventoRoutes.put('/:id', update);
solicitudEventoRoutes.patch('/:id', update);
solicitudEventoRoutes.delete('/:id', remove);
