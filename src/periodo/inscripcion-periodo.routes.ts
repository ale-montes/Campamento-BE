import { Router } from 'express';
import { InscripcionPeriodoController } from './inscripcion-periodo.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import { validateSchema } from '../shared/middleware/validation.middleware.js';
import { inscripPeriodoSchema, inscripPeriodoUpdateSchema } from './inscripcion-periodo.schema.js';

export const inscripPeriodoRoutes = Router();
const controller = new InscripcionPeriodoController();

// Middlewares globales
inscripPeriodoRoutes.use(authMiddleware, checkPermission);

// Rutas CRUD
inscripPeriodoRoutes.get('/', controller.findAll.bind(controller));
inscripPeriodoRoutes.get('/current', controller.getInscripcionVigente.bind(controller));
inscripPeriodoRoutes.get('/:id', controller.findOne.bind(controller));
inscripPeriodoRoutes.post('/', validateSchema(inscripPeriodoSchema), controller.add.bind(controller));
inscripPeriodoRoutes.put('/:id', validateSchema(inscripPeriodoSchema), controller.update.bind(controller));
inscripPeriodoRoutes.patch('/:id', validateSchema(inscripPeriodoUpdateSchema), controller.update.bind(controller));
inscripPeriodoRoutes.delete('/:id', controller.remove.bind(controller));
