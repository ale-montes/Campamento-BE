import { Request, Response } from 'express';
import { AsignaMision } from './asigna-mision.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const misionesAsignadas = await em.find(AsignaMision, {}, { populate: ['mision'] });
    res.status(200).json({ message: 'found all misiones', data: misionesAsignadas });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Unknown error', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const asignaMision = await em.findOneOrFail(AsignaMision, { id }, { populate: ['mision'] });
    res.status(200).json({ message: 'found asignaMision', data: asignaMision });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Unknown error', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}

async function add(req: Request, res: Response) {
  try {
    const asignaMision = em.create(AsignaMision, req.body);
    await em.flush();
    res.status(201).json({ message: 'asignaMision created', data: asignaMision });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Unknown error', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const asignaMision = await em.findOneOrFail(AsignaMision, { id });
    em.assign(asignaMision, req.body);
    await em.flush();
    res.status(200).json({ message: 'asignaMision updated' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Unknown error', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const asignaMision = em.getReference(AsignaMision, id);
    await em.removeAndFlush(asignaMision);
    res.status(200).send({ message: 'asignaMision deleted' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Unknown error', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}

export { findAll, findOne, add, update, remove };
