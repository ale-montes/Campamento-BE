import { Router } from 'express';
import { SolicitudEventoController } from './solicitud-evento.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import { validateRequestByRole, validateResponseByRole } from '../shared/middleware/validateByRole.middleware.js';
import {
  solicitudEventoInputSchemaAdmin,
  solicitudEventoInputSchemaCampista,
  solicitudEventoInputSchemaInstructor,
  solicitudEventoInputUpdateSchemaAdmin,
  solicitudEventoInputUpdateSchemaCampista,
  solicitudEventoInputUpdateSchemaInstructor,
  solicitudEventoOutputSchemaAdmin,
  solicitudEventoOutputSchemaCampista,
  solicitudEventoOutputSchemaInstructor,
} from './solicitud-evento.schema.js';

export const solicitudEventoRoutes = Router();
const controller = new SolicitudEventoController();

solicitudEventoRoutes.use(authMiddleware, checkPermission);

// GET
solicitudEventoRoutes.get(
  '/',
  validateResponseByRole({
    admin: solicitudEventoOutputSchemaAdmin,
    campista: solicitudEventoOutputSchemaCampista,
    instructor: solicitudEventoOutputSchemaInstructor,
  }),
  controller.findAll.bind(controller),
);

// GET /:id
solicitudEventoRoutes.get(
  '/:id',
  validateResponseByRole({
    admin: solicitudEventoOutputSchemaAdmin,
    campista: solicitudEventoOutputSchemaCampista,
    instructor: solicitudEventoOutputSchemaInstructor,
  }),
  controller.findOne.bind(controller),
);

// POST
solicitudEventoRoutes.post(
  '/',
  validateRequestByRole({
    admin: solicitudEventoInputSchemaAdmin,
    campista: solicitudEventoInputSchemaCampista,
    instructor: solicitudEventoInputSchemaInstructor,
  }),
  controller.add.bind(controller),
);

// PUT /:id
solicitudEventoRoutes.put(
  '/:id',
  validateRequestByRole({
    admin: solicitudEventoInputUpdateSchemaAdmin,
    instructor: solicitudEventoInputUpdateSchemaInstructor,
  }),
  controller.update.bind(controller),
);

// PATCH /:id
solicitudEventoRoutes.patch(
  '/:id',
  validateRequestByRole({
    admin: solicitudEventoInputUpdateSchemaAdmin,
    campista: solicitudEventoInputUpdateSchemaCampista,
    instructor: solicitudEventoInputUpdateSchemaInstructor,
  }),
  controller.update.bind(controller),
);

// DELETE /:id
solicitudEventoRoutes.delete('/:id', controller.remove.bind(controller));
