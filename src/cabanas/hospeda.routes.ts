import { Router } from 'express';
import { HospedaController } from './hospeda.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import { validateResponseByRole, validateRequestByRole } from '../shared/middleware/validateByRole.middleware.js';
import {
  hospedaInputSchemaAdmin,
  hospedaInputSchemaCampista,
  hospedaInputSchemaInstructor,
  hospedaInputUpdateSchemaAdmin,
  hospedaInputUpdateSchemaCampista,
  hospedaInputUpdateSchemaInstructor,
  hospedaOutputSchemaAdmin,
  hospedaOutputSchemaCampista,
  hospedaOutputSchemaInstructor,
} from './hospeda.schema.js';

export const hospedaRoutes = Router();
const hospedaController = new HospedaController();

// Todas las rutas requieren autenticación y permisos
hospedaRoutes.use(authMiddleware, checkPermission);

// Rutas privadas
hospedaRoutes.get(
  '/',
  validateResponseByRole({
    admin: hospedaOutputSchemaAdmin,
    campista: hospedaOutputSchemaCampista,
    instructor: hospedaOutputSchemaInstructor,
  }),
  hospedaController.findAll.bind(hospedaController),
);

hospedaRoutes.get(
  '/:id',
  validateResponseByRole({
    admin: hospedaOutputSchemaAdmin,
    campista: hospedaOutputSchemaCampista,
    instructor: hospedaOutputSchemaInstructor,
  }),
  hospedaController.findOne.bind(hospedaController),
);

hospedaRoutes.post(
  '/',
  validateRequestByRole({
    admin: hospedaInputSchemaAdmin,
    campista: hospedaInputSchemaCampista,
    instructor: hospedaInputSchemaInstructor,
  }),
  hospedaController.add.bind(hospedaController),
);

hospedaRoutes.put(
  '/:id',
  validateRequestByRole({
    admin: hospedaInputUpdateSchemaAdmin,
    campista: hospedaInputUpdateSchemaCampista,
    instructor: hospedaInputUpdateSchemaInstructor,
  }),
  hospedaController.update.bind(hospedaController),
);

hospedaRoutes.patch(
  '/:id',
  validateRequestByRole({
    admin: hospedaInputUpdateSchemaAdmin,
    campista: hospedaInputUpdateSchemaCampista,
    instructor: hospedaInputUpdateSchemaInstructor,
  }),
  hospedaController.update.bind(hospedaController),
);

hospedaRoutes.patch('/:id/move', hospedaController.moveCampista.bind(hospedaController));

hospedaRoutes.delete('/:id', hospedaController.remove.bind(hospedaController));
