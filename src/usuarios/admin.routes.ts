import { Router } from 'express';
import { AdminController } from './admin.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { validateSchema } from '../shared/middleware/validation.middleware.js';
import { adminSchema, adminUpdateSchema } from './admin.schema.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const adminRoutes = Router();
const controller = new AdminController();

adminRoutes.use(authMiddleware, checkPermission);

adminRoutes.get('/', controller.findAll.bind(controller));
adminRoutes.get('/:id', controller.findOne.bind(controller));
adminRoutes.post('/', validateSchema(adminSchema), controller.add.bind(controller));
adminRoutes.put('/:id', validateSchema(adminSchema), controller.update.bind(controller));
adminRoutes.patch('/:id', validateSchema(adminUpdateSchema), controller.update.bind(controller));
adminRoutes.delete('/:id', controller.remove.bind(controller));
