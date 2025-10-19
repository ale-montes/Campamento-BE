import { Router } from 'express';
import { CampistaController } from './campista.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { validateSchema } from '../shared/middleware/validation.middleware.js';
import { campistaSchema, campistaUpdateSchema } from './campista.schema.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';

export const campistaRoutes = Router();
const controller = new CampistaController();
//Rutas Publicas

campistaRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
campistaRoutes.get('/', controller.findAll.bind(controller));
campistaRoutes.get('/:id', controller.findOne.bind(controller));
campistaRoutes.post('/', validateSchema(campistaSchema), controller.add.bind(controller));
campistaRoutes.put('/:id', validateSchema(campistaSchema), controller.update.bind(controller));
campistaRoutes.patch('/:id', validateSchema(campistaUpdateSchema), controller.update.bind(controller));
campistaRoutes.delete('/:id', controller.remove.bind(controller));
