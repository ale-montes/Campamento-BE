import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './inscripcion-taller.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { validateSchema } from '../shared/middleware/validation.middleware.js';
import { inscripTallerSchema } from './inscripcion-taller.schema.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const inscripcionTallerRoutes = Router();
//Rutas Publicas

inscripcionTallerRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
inscripcionTallerRoutes.get('/', findAll);
inscripcionTallerRoutes.get('/:id', findOne);
inscripcionTallerRoutes.post('/', validateSchema(inscripTallerSchema), add);
inscripcionTallerRoutes.put('/:id', validateSchema(inscripTallerSchema), update);
inscripcionTallerRoutes.patch('/:id', validateSchema(inscripTallerSchema), update);
inscripcionTallerRoutes.delete('/:id', remove);
