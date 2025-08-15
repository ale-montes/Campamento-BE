import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './instructor.controler.js';

export const instructorRoutes = Router();

instructorRoutes.get('/', findAll);
instructorRoutes.get('/:id', findOne);
instructorRoutes.post('/', add);
instructorRoutes.put('/:id', update);
instructorRoutes.patch('/:id', update);
instructorRoutes.delete('/:id', remove);
