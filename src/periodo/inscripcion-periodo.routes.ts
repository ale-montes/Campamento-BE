import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './inscripcion-periodo.controler.js';
import { authMiddleware } from '../shared/middleware/auth.middleware.js';
import { checkPermission } from '../shared/middleware/permission.middleware.js';
import { findByUserId } from './inscripcion-periodo.service.js';
export const incripcionPeriodoRoutes = Router();
//Rutas Publicas

incripcionPeriodoRoutes.use(authMiddleware, checkPermission);
//Rutas Privadas
incripcionPeriodoRoutes.get('/', findAll);
incripcionPeriodoRoutes.get('/:id', findOne);
incripcionPeriodoRoutes.get('/user/:userId', findByUserId);
incripcionPeriodoRoutes.post('/', add);
incripcionPeriodoRoutes.put('/:id', update);
incripcionPeriodoRoutes.patch('/:id', update);
incripcionPeriodoRoutes.delete('/:id', remove);
