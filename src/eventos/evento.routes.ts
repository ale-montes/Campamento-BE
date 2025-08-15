import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './evento.controler.js';

export const eventoRoutes = Router();

eventoRoutes.get('/', findAll);
eventoRoutes.get('/:id', findOne);
eventoRoutes.post('/', add);
eventoRoutes.put('/:id', update);
eventoRoutes.patch('/:id', update);
eventoRoutes.delete('/:id', remove);
