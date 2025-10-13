import { Request, Response } from 'express';
import { Cabania, cabinStatus } from './cabania.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const cabanias = await em.find(Cabania, { cabinStatus: cabinStatus.Activo }, { populate: ['deidad'] });
    res.status(200).json({ message: 'found all cabanias', data: cabanias });
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
    const cabana = await em.findOneOrFail(Cabania, { id }, { populate: ['deidad'] });
    res.status(200).json({ message: 'found cabana', data: cabana });
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
    const cabana = em.create(Cabania, req.body);
    await em.flush();
    res.status(201).json({ message: 'cabana created', data: cabana });
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
    const cabana = em.getReference(Cabania, id);
    em.assign(cabana, req.body);
    await em.flush();
    res.status(200).json({ message: 'cabana updated' });
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
    const cabana = await em.findOneOrFail(Cabania, { id });

    cabana.cabinStatus = cabinStatus.Inactivo;
    await em.flush();

    res.status(200).send({ message: 'cabana marked as inactive' });
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

/*async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const cabana = em.getReference(Cabania, id);
    await em.removeAndFlush(cabana);
    res.status(200).send({ message: 'cabana deleted' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Unknown error', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}*/

export { findAll, findOne, add, update, remove };
