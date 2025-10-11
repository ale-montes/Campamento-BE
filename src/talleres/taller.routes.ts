import { Router } from 'express';
import { TallerController } from './taller.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { validateSchema } from '../shared/middleware/validation.middleware.js';
import { tallerSchema, tallerUpdateSchema } from './taller.schema.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const tallerRoutes = Router();
const tallerController = new TallerController();

//Rutas Publicas

tallerRoutes.use(authMiddleware, checkPermission);

//Rutas Privadas
tallerRoutes.get('/', tallerController.findAll.bind(tallerController));
tallerRoutes.get('/:id', tallerController.findOne.bind(tallerController));
tallerRoutes.post('/', validateSchema(tallerSchema), tallerController.add.bind(tallerController));
tallerRoutes.put(
  '/:id',
  validateSchema(tallerSchema),
  tallerController.update.bind(tallerController),
);
tallerRoutes.patch(
  '/:id',
  validateSchema(tallerUpdateSchema),
  tallerController.update.bind(tallerController),
);
tallerRoutes.delete('/:id', tallerController.remove.bind(tallerController));
