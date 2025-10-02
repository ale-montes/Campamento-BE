import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './cabania.controler.js';
import { validateSchema } from '../shared/validate.js';
import { cabanaSchema, cabanaUpdateSchema } from './cabanas.schema.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const cabaniaRoutes = Router();
//Rutas Publicas

cabaniaRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
cabaniaRoutes.get('/', findAll);
cabaniaRoutes.get('/:id', findOne);
cabaniaRoutes.post('/', validateSchema(cabanaSchema), add);
cabaniaRoutes.put('/:id', validateSchema(cabanaUpdateSchema), update);
cabaniaRoutes.patch('/:id', validateSchema(cabanaUpdateSchema), update);
cabaniaRoutes.delete('/:id', remove);
