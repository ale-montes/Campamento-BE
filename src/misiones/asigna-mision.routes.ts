import { Router } from 'express';
import { AsignaMisionController } from './asigna-mision.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import { validateRequestByRole, validateResponseByRole } from '../shared/middleware/validateByRole.middleware.js';
import {
  asignaMisionInputSchemaAdmin,
  asignaMisionInputSchemaInstructor,
  asignaMisionInputUpdateSchemaAdmin,
  asignaMisionInputUpdateSchemaInstructor,
  asignaMisionOutputSchemaAdmin,
  asignaMisionOutputSchemaCampista,
  asignaMisionOutputSchemaInstructor,
} from './asigna-mision.schema.js';

export const asignaMisionRoutes = Router();
const controller = new AsignaMisionController();

// Middleware de autenticación y permisos
asignaMisionRoutes.use(authMiddleware, checkPermission);

// Rutas privadas
asignaMisionRoutes.get(
  '/',
  validateResponseByRole({
    admin: asignaMisionOutputSchemaAdmin,
    instructor: asignaMisionOutputSchemaInstructor,
    campista: asignaMisionOutputSchemaCampista,
  }),
  controller.findAll.bind(controller),
);

asignaMisionRoutes.get(
  '/:id',
  validateResponseByRole({
    admin: asignaMisionOutputSchemaAdmin,
    instructor: asignaMisionOutputSchemaInstructor,
    campista: asignaMisionOutputSchemaCampista,
  }),
  controller.findOne.bind(controller),
);

asignaMisionRoutes.post(
  '/',
  validateRequestByRole({
    admin: asignaMisionInputSchemaAdmin,
    instructor: asignaMisionInputSchemaInstructor,
  }),
  controller.add.bind(controller),
);

asignaMisionRoutes.put(
  '/:id',
  validateRequestByRole({
    admin: asignaMisionInputUpdateSchemaAdmin,
    instructor: asignaMisionInputUpdateSchemaInstructor,
  }),
  controller.update.bind(controller),
);

asignaMisionRoutes.patch(
  '/:id',
  validateRequestByRole({
    admin: asignaMisionInputUpdateSchemaAdmin,
    instructor: asignaMisionInputUpdateSchemaInstructor,
  }),
  controller.update.bind(controller),
);

asignaMisionRoutes.delete('/:id', controller.remove.bind(controller));
