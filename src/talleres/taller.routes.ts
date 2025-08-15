import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './taller.controler.js';

export const tallerRoutes = Router();

tallerRoutes.get('/', findAll);
tallerRoutes.get('/:id', findOne);
tallerRoutes.post('/', add);
tallerRoutes.put('/:id', update);
tallerRoutes.patch('/:id', update);
tallerRoutes.delete('/:id', remove);
