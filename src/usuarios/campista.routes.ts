import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './campista.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const campistaRoutes = Router();
//Rutas Publicas

campistaRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
campistaRoutes.get('/', findAll);
campistaRoutes.get('/:id', findOne);
campistaRoutes.post('/', add);
campistaRoutes.put('/:id', update);
campistaRoutes.patch('/:id', update);
campistaRoutes.delete('/:id', remove);
