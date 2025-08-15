import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './solicitud-evento.controler.js';

export const solicitudEventoRoutes = Router();

solicitudEventoRoutes.get('/', findAll);
solicitudEventoRoutes.get('/:id', findOne);
solicitudEventoRoutes.post('/', add);
solicitudEventoRoutes.put('/:id', update);
solicitudEventoRoutes.patch('/:id', update);
solicitudEventoRoutes.delete('/:id', remove);
