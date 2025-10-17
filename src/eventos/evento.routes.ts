import { Router } from 'express';
import { EventoController } from './evento.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import { validateRequestByRole, validateResponseByRole } from '../shared/middleware/validateByRole.middleware.js';
import {
  eventoInputSchema,
  eventoUpdateSchema,
  eventoOutputSchemaAdmin,
  eventoOutputSchemaInstructor,
  eventoOutputSchemaCampista,
} from './evento.schema.js';

export const eventoRoutes = Router();
const eventoController = new EventoController();

eventoRoutes.use(authMiddleware, checkPermission);

// GET all
eventoRoutes.get(
  '/',
  validateResponseByRole({
    admin: eventoOutputSchemaAdmin,
    instructor: eventoOutputSchemaInstructor,
    campista: eventoOutputSchemaCampista,
  }),
  eventoController.findAll.bind(eventoController),
);

// GET one
eventoRoutes.get(
  '/:id',
  validateResponseByRole({
    admin: eventoOutputSchemaAdmin,
    instructor: eventoOutputSchemaInstructor,
    campista: eventoOutputSchemaCampista,
  }),
  eventoController.findOne.bind(eventoController),
);

// POST
eventoRoutes.post(
  '/',
  validateRequestByRole({ admin: eventoInputSchema }),
  validateResponseByRole({ admin: eventoOutputSchemaAdmin }),
  eventoController.add.bind(eventoController),
);

// PUT/PATCH
eventoRoutes.put(
  '/:id',
  validateRequestByRole({ admin: eventoUpdateSchema }),
  eventoController.update.bind(eventoController),
);
eventoRoutes.patch(
  '/:id',
  validateRequestByRole({ admin: eventoUpdateSchema }),
  eventoController.update.bind(eventoController),
);

// DELETE
eventoRoutes.delete('/:id', eventoController.remove.bind(eventoController));
