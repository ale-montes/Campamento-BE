import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './cabania.controler.js';

export const cabaniaRoutes = Router();

cabaniaRoutes.get('/', findAll);
cabaniaRoutes.get('/:id', findOne);
cabaniaRoutes.post('/', add);
cabaniaRoutes.put('/:id', update);
cabaniaRoutes.patch('/:id', update);
cabaniaRoutes.delete('/:id', remove);
