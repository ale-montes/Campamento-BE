import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './inscripcion-taller.controler.js';

export const inscripcionTallerRoutes = Router();

inscripcionTallerRoutes.get('/', findAll);
inscripcionTallerRoutes.get('/:id', findOne);
inscripcionTallerRoutes.post('/', add);
inscripcionTallerRoutes.put('/:id', update);
inscripcionTallerRoutes.patch('/:id', update);
inscripcionTallerRoutes.delete('/:id', remove);
