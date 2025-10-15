import { Router } from 'express';
import { InscripcionTallerController } from './inscripcion-taller.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import {
  inscripcionTallerInputSchemaAdmin,
  inscripcionTallerInputSchemaCampista,
  inscripcionTallerInputSchemaInstructor,
  inscripcionTallerInputUpdateSchemaAdmin,
  inscripcionTallerInputUpdateSchemaCampista,
  inscripcionTallerInputUpdateSchemaInstructor,
  inscripcionTallerOutputSchemaAdmin,
  inscripcionTallerOutputSchemaCampista,
  inscripcionTallerOutputSchemaInstructor,
} from './inscripcion-taller.schema.js';
import { validateResponseByRole, validateRequestByRole } from '../shared/middleware/validateByRole.middleware.js';

export const inscripTallerRoutes = Router();
const inscripcionTallerController = new InscripcionTallerController();

// Todas las rutas requieren autenticación y permisos
inscripTallerRoutes.use(authMiddleware, checkPermission);

// Rutas privadas
inscripTallerRoutes.get(
  '/',
  validateResponseByRole({
    admin: inscripcionTallerOutputSchemaAdmin,
    campista: inscripcionTallerOutputSchemaCampista,
    instructor: inscripcionTallerOutputSchemaInstructor,
  }),
  inscripcionTallerController.findAll.bind(inscripcionTallerController),
);

inscripTallerRoutes.get(
  '/:id',
  validateResponseByRole({
    admin: inscripcionTallerOutputSchemaAdmin,
    campista: inscripcionTallerOutputSchemaCampista,
    instructor: inscripcionTallerOutputSchemaInstructor,
  }),
  inscripcionTallerController.findOne.bind(inscripcionTallerController),
);

inscripTallerRoutes.post(
  '/',
  validateRequestByRole({
    admin: inscripcionTallerInputSchemaAdmin,
    campista: inscripcionTallerInputSchemaCampista,
    instructor: inscripcionTallerInputSchemaInstructor,
  }),
  validateResponseByRole({
    admin: inscripcionTallerOutputSchemaAdmin,
    campista: inscripcionTallerOutputSchemaCampista,
    instructor: inscripcionTallerOutputSchemaInstructor,
  }),
  inscripcionTallerController.add.bind(inscripcionTallerController),
);

inscripTallerRoutes.put(
  '/:id',
  validateRequestByRole({
    admin: inscripcionTallerInputUpdateSchemaAdmin,
    campista: inscripcionTallerInputUpdateSchemaCampista,
    instructor: inscripcionTallerInputUpdateSchemaInstructor,
  }),
  inscripcionTallerController.update.bind(inscripcionTallerController),
);

inscripTallerRoutes.patch(
  '/:id',
  validateRequestByRole({
    admin: inscripcionTallerInputUpdateSchemaAdmin,
    campista: inscripcionTallerInputUpdateSchemaCampista,
    instructor: inscripcionTallerInputUpdateSchemaInstructor,
  }),
  inscripcionTallerController.update.bind(inscripcionTallerController),
);

inscripTallerRoutes.delete('/:id', inscripcionTallerController.remove.bind(inscripcionTallerController));
