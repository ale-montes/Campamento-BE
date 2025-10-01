import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './taller.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { validateSchema } from '../shared/middleware/validation.middleware.js';
import { TallerSchema } from './taller.schema.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const tallerRoutes = Router();
//Rutas Publicas

tallerRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
tallerRoutes.get('/', findAll);
tallerRoutes.get('/:id', findOne);
tallerRoutes.post('/', validateSchema(TallerSchema), add);
tallerRoutes.put('/:id', validateSchema(TallerSchema), update);
tallerRoutes.patch('/:id', validateSchema(TallerSchema), update);
tallerRoutes.delete('/:id', remove);
