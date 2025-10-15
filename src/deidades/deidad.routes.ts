import { Router } from 'express';
import { DeidadController } from './deidad.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import {
  deidadInputSchemaAdmin,
  deidadInputSchemaCampista,
  deidadInputSchemaInstructor,
  deidadInputUpdateSchemaAdmin,
  deidadInputUpdateSchemaCampista,
  deidadInputUpdateSchemaInstructor,
  deidadOutputSchemaAdmin,
  deidadOutputSchemaCampista,
  deidadOutputSchemaInstructor,
} from './deidad.schema.js';
import { validateResponseByRole, validateRequestByRole } from '../shared/middleware/validateByRole.middleware.js';

export const deidadRoutes = Router();
const deidadController = new DeidadController();

// Todas las rutas requieren autenticación y permisos
deidadRoutes.use(authMiddleware, checkPermission);

// Rutas privadas
deidadRoutes.get(
  '/',
  validateResponseByRole({
    admin: deidadOutputSchemaAdmin,
    campista: deidadOutputSchemaCampista,
    instructor: deidadOutputSchemaInstructor,
  }),
  deidadController.findAll.bind(deidadController),
);

deidadRoutes.get(
  '/:id',
  validateResponseByRole({
    admin: deidadOutputSchemaAdmin,
    campista: deidadOutputSchemaCampista,
    instructor: deidadOutputSchemaInstructor,
  }),
  deidadController.findOne.bind(deidadController),
);

deidadRoutes.post(
  '/',
  validateRequestByRole({
    admin: deidadInputSchemaAdmin,
    campista: deidadInputSchemaCampista,
    instructor: deidadInputSchemaInstructor,
  }),
  deidadController.add.bind(deidadController),
);

deidadRoutes.put(
  '/:id',
  validateRequestByRole({
    admin: deidadInputUpdateSchemaAdmin,
    campista: deidadInputUpdateSchemaCampista,
    instructor: deidadInputUpdateSchemaInstructor,
  }),
  deidadController.update.bind(deidadController),
);

deidadRoutes.patch(
  '/:id',
  validateRequestByRole({
    admin: deidadInputUpdateSchemaAdmin,
    campista: deidadInputUpdateSchemaCampista,
    instructor: deidadInputUpdateSchemaInstructor,
  }),
  deidadController.update.bind(deidadController),
);

deidadRoutes.delete('/:id', deidadController.remove.bind(deidadController));
