import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './deidad.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const deidadRoutes = Router();
//Rutas Publicas

deidadRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
deidadRoutes.get('/', findAll);
deidadRoutes.get('/:id', findOne);
deidadRoutes.post('/', add);
deidadRoutes.put('/:id', update);
deidadRoutes.patch('/:id', update);
deidadRoutes.delete('/:id', remove);
