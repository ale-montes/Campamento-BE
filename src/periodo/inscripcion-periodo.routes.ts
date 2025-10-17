import { Router } from 'express';
import { InscripcionPeriodoController } from './inscripcion-periodo.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import { validateRequestByRole, validateResponseByRole } from '../shared/middleware/validateByRole.middleware.js';
import {
  inscripcionPeriodoInputSchemaAdmin,
  inscripcionPeriodoInputSchemaCampista,
  inscripcionPeriodoUpdateSchemaAdmin,
  inscripcionPeriodoOutputSchemaAdmin,
  inscripcionPeriodoOutputSchemaInstructor,
  inscripcionPeriodoOutputSchemaCampista,
} from './inscripcion-periodo.schema.js';

export const inscripPeriodoRoutes = Router();
const controller = new InscripcionPeriodoController();

//  Middlewares globales
inscripPeriodoRoutes.use(authMiddleware, checkPermission);

// GET ALL
inscripPeriodoRoutes.get(
  '/',
  validateResponseByRole({
    admin: inscripcionPeriodoOutputSchemaAdmin,
    instructor: inscripcionPeriodoOutputSchemaInstructor,
    campista: inscripcionPeriodoOutputSchemaCampista,
  }),
  controller.findAll.bind(controller),
);
// GET INSCRIPCIÓN VIGENTE
inscripPeriodoRoutes.get(
  '/current',
  validateResponseByRole({
    campista: inscripcionPeriodoOutputSchemaCampista,
  }),
  controller.getInscripcionVigente.bind(controller),
);

//  GET ONE
inscripPeriodoRoutes.get(
  '/:id',
  validateResponseByRole({
    admin: inscripcionPeriodoOutputSchemaAdmin,
    instructor: inscripcionPeriodoOutputSchemaInstructor,
    campista: inscripcionPeriodoOutputSchemaCampista,
  }),
  controller.findOne.bind(controller),
);

//  CREATE (todos los roles)
inscripPeriodoRoutes.post(
  '/',
  validateRequestByRole({
    admin: inscripcionPeriodoInputSchemaAdmin,
    campista: inscripcionPeriodoInputSchemaCampista,
  }),
  validateResponseByRole({
    admin: inscripcionPeriodoOutputSchemaAdmin,
    campista: inscripcionPeriodoOutputSchemaCampista,
  }),
  controller.add.bind(controller),
);

//  UPDATE (solo admin)
inscripPeriodoRoutes.put(
  '/:id',
  validateRequestByRole({
    admin: inscripcionPeriodoInputSchemaAdmin,
  }),
  controller.update.bind(controller),
);

inscripPeriodoRoutes.patch(
  '/:id',
  validateRequestByRole({
    admin: inscripcionPeriodoUpdateSchemaAdmin,
  }),
  controller.update.bind(controller),
);

// DELETE (solo admin)
inscripPeriodoRoutes.delete('/:id', controller.remove.bind(controller));
