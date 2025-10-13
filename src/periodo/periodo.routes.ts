// src/periodo/periodo.routes.ts
import { Router } from 'express';
import { PeriodoController } from './periodo.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import { validateSchema } from '../shared/middleware/validation.middleware.js';
import { periodoSchema, periodoUpdateSchema } from './periodo.schema.js';

const controller = new PeriodoController();
export const periodoRoutes = Router();

periodoRoutes.use(authMiddleware, checkPermission);

periodoRoutes.get('/', controller.findAll.bind(controller));
periodoRoutes.get('/current', controller.getVigente.bind(controller));
periodoRoutes.get('/:id', controller.findOne.bind(controller));
periodoRoutes.post('/', validateSchema(periodoSchema), controller.add.bind(controller));
periodoRoutes.put('/:id', validateSchema(periodoSchema), controller.update.bind(controller));
periodoRoutes.patch('/:id', validateSchema(periodoUpdateSchema), controller.update.bind(controller));
periodoRoutes.delete('/:id', controller.remove.bind(controller));
