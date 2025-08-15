import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './mision.controler.js';

export const misionRoutes = Router();

misionRoutes.get('/', findAll);
misionRoutes.get('/:id', findOne);
misionRoutes.post('/', add);
misionRoutes.put('/:id', update);
misionRoutes.patch('/:id', update);
misionRoutes.delete('/:id', remove);
