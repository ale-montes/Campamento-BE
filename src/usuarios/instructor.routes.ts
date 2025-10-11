import { Router } from 'express';
import { InstructorController } from './instructor.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { validateSchema } from '../shared/middleware/validation.middleware.js';
import { instructorSchema, instructorUpdateSchema } from './instructor.schema.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const instructorRoutes = Router();
const controller = new InstructorController();

instructorRoutes.use(authMiddleware, checkPermission);

instructorRoutes.get('/', controller.findAll.bind(controller));
instructorRoutes.get('/:id', controller.findOne.bind(controller));
instructorRoutes.post('/', validateSchema(instructorSchema), controller.add.bind(controller));
instructorRoutes.put('/:id', validateSchema(instructorSchema), controller.update.bind(controller));
instructorRoutes.patch(
  '/:id',
  validateSchema(instructorUpdateSchema),
  controller.update.bind(controller),
);
instructorRoutes.delete('/:id', controller.remove.bind(controller));
