import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './asigna-mision.controler.js';

export const asignaMisionRoutes = Router();

asignaMisionRoutes.get('/', findAll);
asignaMisionRoutes.get('/:id', findOne);
asignaMisionRoutes.post('/', add);
asignaMisionRoutes.put('/:id', update);
asignaMisionRoutes.patch('/:id', update);
asignaMisionRoutes.delete('/:id', remove);
