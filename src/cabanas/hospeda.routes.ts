import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './hospeda.controler.js';
import { moveCampista } from './hospeda.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const hospedaRoutes = Router();
//Rutas Publicas

hospedaRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
hospedaRoutes.get('/', findAll);
hospedaRoutes.get('/:id', findOne);
hospedaRoutes.post('/', add);
hospedaRoutes.put('/:id', update);
hospedaRoutes.patch('/:id/move', moveCampista);
hospedaRoutes.delete('/:id', remove);
