import { Request, Response } from 'express';
import { InscripcionPeriodo } from './inscripcion-periodo.entity.js';
import { orm } from '../shared/db/orm.js';
import { Periodo } from './periodo.entity.js';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const periodosInscripciones = await em.find(
      InscripcionPeriodo,
      {},
      { populate: ['periodo', 'campista'] },
    );
    res.status(200).json({ message: 'found all periodos', data: periodosInscripciones });
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
    const incripcionPeriodo = await em.findOneOrFail(
      InscripcionPeriodo,
      { id },
      { populate: ['periodo'] },
    );
    res.status(200).json({ message: 'found incripcionPeriodo', data: incripcionPeriodo });
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
    // Obtener el periodo relacionado
    const periodoId = req.body.periodo;
    const periodo = await em.findOneOrFail(Periodo, { id: periodoId });
    if (periodo.estado !== 'abierto') {
      return res.status(400).json({ message: 'El periodo no está abierto para inscripciones.' });
    }
    const incripcionPeriodo = em.create(InscripcionPeriodo, req.body);
    await em.flush();
    res.status(201).json({ message: 'incripcionPeriodo created', data: incripcionPeriodo });
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
    const incripcionPeriodo = await em.findOneOrFail(InscripcionPeriodo, { id });
    em.assign(incripcionPeriodo, req.body);
    await em.flush();
    res.status(200).json({ message: 'incripcionPeriodo updated' });
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
    const incripcionPeriodo = em.getReference(InscripcionPeriodo, id);
    await em.removeAndFlush(incripcionPeriodo);
    res.status(200).send({ message: 'incripcionPeriodo deleted' });
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
