import { Router } from 'express';
import { CabaniaController } from './cabania.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import {
  cabaniaInputSchemaAdmin,
  cabaniaInputSchemaCampista,
  cabaniaOutputSchemaAdmin,
  cabaniaOutputSchemaCampista,
  cabaniaInputSchemaInstructor,
  cabaniaInputUpdateSchemaInstructor,
  cabaniaInputUpdateSchemaAdmin,
  cabaniaInputUpdateSchemaCampista,
  cabaniaOutputSchemaInstructor,
} from './cabania.schema.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import { validateResponseByRole, validateRequestByRole } from '../shared/middleware/validateByRole.middleware.js';
export const cabaniaRoutes = Router();
const cabaniaController = new CabaniaController();

// Todas las rutas requieren autenticación y permisos
cabaniaRoutes.use(authMiddleware, checkPermission);

// Rutas privadas
cabaniaRoutes.get(
  '/',
  validateResponseByRole({
    admin: cabaniaOutputSchemaAdmin,
    campista: cabaniaOutputSchemaCampista,
    instructor: cabaniaOutputSchemaInstructor,
  }),
  cabaniaController.findAll.bind(cabaniaController),
);
cabaniaRoutes.get(
  '/:id',
  validateResponseByRole({
    admin: cabaniaOutputSchemaAdmin,
    campista: cabaniaOutputSchemaCampista,
    instructor: cabaniaOutputSchemaInstructor,
  }),
  cabaniaController.findOne.bind(cabaniaController),
);
cabaniaRoutes.post(
  '/',
  validateRequestByRole({
    admin: cabaniaInputSchemaAdmin,
    campista: cabaniaInputSchemaCampista,
    instructor: cabaniaInputSchemaInstructor,
  }),
  cabaniaController.add.bind(cabaniaController),
);
cabaniaRoutes.put(
  '/:id',
  validateRequestByRole({
    admin: cabaniaInputUpdateSchemaAdmin,
    campista: cabaniaInputUpdateSchemaCampista,
    instructor: cabaniaInputUpdateSchemaInstructor,
  }),
  cabaniaController.update.bind(cabaniaController),
);
cabaniaRoutes.patch(
  '/:id',
  validateRequestByRole({
    admin: cabaniaInputUpdateSchemaAdmin,
    campista: cabaniaInputUpdateSchemaCampista,
    instructor: cabaniaInputUpdateSchemaInstructor,
  }),
  cabaniaController.update.bind(cabaniaController),
);
cabaniaRoutes.delete('/:id', cabaniaController.remove.bind(cabaniaController));
