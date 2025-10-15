import { Router } from 'express';
import { TallerController } from './taller.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import {
  tallerInputSchemaAdmin,
  tallerInputSchemaCampista,
  tallerInputSchemaInstructor,
  tallerInputUpdateSchemaAdmin,
  tallerInputUpdateSchemaCampista,
  tallerInputUpdateSchemaInstructor,
  tallerOutputSchemaAdmin,
  tallerOutputSchemaCampista,
  tallerOutputSchemaInstructor,
} from './taller.schema.js';
import { validateResponseByRole, validateRequestByRole } from '../shared/middleware/validateByRole.middleware.js';

export const tallerRoutes = Router();
const tallerController = new TallerController();

// Todas las rutas requieren autenticación y permisos
tallerRoutes.use(authMiddleware, checkPermission);

// Rutas privadas
tallerRoutes.get(
  '/',
  validateResponseByRole({
    admin: tallerOutputSchemaAdmin,
    campista: tallerOutputSchemaCampista,
    instructor: tallerOutputSchemaInstructor,
  }),
  tallerController.findAll.bind(tallerController),
);

tallerRoutes.get(
  '/:id',
  validateResponseByRole({
    admin: tallerOutputSchemaAdmin,
    campista: tallerOutputSchemaCampista,
    instructor: tallerOutputSchemaInstructor,
  }),
  tallerController.findOne.bind(tallerController),
);

tallerRoutes.post(
  '/',
  validateRequestByRole({
    admin: tallerInputSchemaAdmin,
    campista: tallerInputSchemaCampista,
    instructor: tallerInputSchemaInstructor,
  }),
  tallerController.add.bind(tallerController),
);

tallerRoutes.put(
  '/:id',
  validateRequestByRole({
    admin: tallerInputUpdateSchemaAdmin,
    campista: tallerInputUpdateSchemaCampista,
    instructor: tallerInputUpdateSchemaInstructor,
  }),
  tallerController.update.bind(tallerController),
);

tallerRoutes.patch(
  '/:id',
  validateRequestByRole({
    admin: tallerInputUpdateSchemaAdmin,
    campista: tallerInputUpdateSchemaCampista,
    instructor: tallerInputUpdateSchemaInstructor,
  }),
  tallerController.update.bind(tallerController),
);

tallerRoutes.delete('/:id', tallerController.remove.bind(tallerController));
