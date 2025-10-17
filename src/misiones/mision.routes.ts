import { Router } from 'express';
import { MisionController } from './mision.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import { validateRequestByRole, validateResponseByRole } from '../shared/middleware/validateByRole.middleware.js';
import {
  misionInputSchemaAdmin,
  misionUpdateSchemaAdmin,
  misionOutputSchemaAdmin,
  misionOutputSchemaCampista,
  misionOutputSchemaInstructor,
} from './mision.schema.js';

export const misionRoutes = Router();
const misionController = new MisionController();

misionRoutes.use(authMiddleware, checkPermission);

misionRoutes.get(
  '/',
  validateResponseByRole({
    admin: misionOutputSchemaAdmin,
    campista: misionOutputSchemaCampista,
    instructor: misionOutputSchemaInstructor,
  }),
  misionController.findAll.bind(misionController),
);

misionRoutes.get(
  '/:id',
  validateResponseByRole({
    admin: misionOutputSchemaAdmin,
    campista: misionOutputSchemaCampista,
    instructor: misionOutputSchemaInstructor,
  }),
  misionController.findOne.bind(misionController),
);

misionRoutes.post(
  '/',
  validateRequestByRole({
    admin: misionInputSchemaAdmin,
  }),
  misionController.add.bind(misionController),
);

misionRoutes.put(
  '/:id',
  validateRequestByRole({
    admin: misionUpdateSchemaAdmin,
  }),
  misionController.update.bind(misionController),
);

misionRoutes.patch(
  '/:id',
  validateRequestByRole({
    admin: misionUpdateSchemaAdmin,
  }),
  misionController.update.bind(misionController),
);

misionRoutes.delete('/:id', misionController.remove.bind(misionController));
