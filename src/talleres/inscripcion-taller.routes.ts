import { Router } from 'express';
import { InscripcionTallerController } from './inscripcion-taller.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import { validateSchema } from '../shared/middleware/validation.middleware.js';
import { inscripTallerSchema, inscripTallerUpdateSchema } from './inscripcion-taller.schema.js';

export const inscripTallerRoutes = Router();
const controller = new InscripcionTallerController();

inscripTallerRoutes.use(authMiddleware, checkPermission);

inscripTallerRoutes.get('/', controller.findAll.bind(controller));
inscripTallerRoutes.get('/:id', controller.findOne.bind(controller));
inscripTallerRoutes.post('/', validateSchema(inscripTallerSchema), controller.add.bind(controller));
inscripTallerRoutes.put(
  '/:id',
  validateSchema(inscripTallerSchema),
  controller.update.bind(controller),
);
inscripTallerRoutes.patch(
  '/:id',
  validateSchema(inscripTallerUpdateSchema),
  controller.update.bind(controller),
);
inscripTallerRoutes.delete('/:id', controller.remove.bind(controller));
