import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './cabania.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const cabaniaRoutes = Router();
//Rutas Publicas

cabaniaRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
cabaniaRoutes.get('/', findAll);
cabaniaRoutes.get('/:id', findOne);
cabaniaRoutes.post('/', add);
cabaniaRoutes.put('/:id', update);
cabaniaRoutes.patch('/:id', update);
cabaniaRoutes.delete('/:id', remove);
