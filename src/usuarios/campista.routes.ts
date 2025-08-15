import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './campista.controler.js';

export const campistaRoutes = Router();

campistaRoutes.get('/', findAll);
campistaRoutes.get('/:id', findOne);
campistaRoutes.post('/', add);
campistaRoutes.put('/:id', update);
campistaRoutes.patch('/:id', update);
campistaRoutes.delete('/:id', remove);
