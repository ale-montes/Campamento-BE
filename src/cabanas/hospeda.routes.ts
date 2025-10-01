import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './hospeda.controler.js';
import { moveCampista } from './hospeda.controler.js';

export const hospedaRoutes = Router();

hospedaRoutes.get('/', findAll);
hospedaRoutes.get('/:id', findOne);
hospedaRoutes.post('/', add);
hospedaRoutes.put('/:id', update);
hospedaRoutes.patch('/:id/move', moveCampista);
hospedaRoutes.delete('/:id', remove);
