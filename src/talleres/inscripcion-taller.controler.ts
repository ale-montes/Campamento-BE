import { Request, Response } from 'express';
import { InscripcionTaller } from './inscripcion-taller.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const inscripciones = await em.find(
      InscripcionTaller,
      {},
      { populate: ['campista', 'taller'] },
    );
    res.status(200).json({ message: 'found all talleres', data: inscripciones });
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
    const inscripcion = await em.findOneOrFail(
      InscripcionTaller,
      { id },
      { populate: ['campista', 'taller'] },
    );
    res.status(200).json({ message: 'found inscripcion', data: inscripcion });
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
    const inscripcion = em.create(InscripcionTaller, req.body);
    await em.flush();
    res.status(201).json({ message: 'inscripcion created', data: inscripcion });
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
    const inscripcion = await em.findOneOrFail(InscripcionTaller, { id });
    em.assign(inscripcion, req.body);
    await em.flush();
    res.status(200).json({ message: 'inscripcion updated' });
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
    const inscripcion = em.getReference(InscripcionTaller, id);
    await em.removeAndFlush(inscripcion);
    res.status(200).send({ message: 'inscripcion deleted' });
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
