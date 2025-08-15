import { Request, Response } from 'express';
import { SolicitudEvento } from './solicitud-evento.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const solicitudes = await em.find(SolicitudEvento, {}, { populate: ['campista', 'evento'] });
    res.status(200).json({ message: 'found all talleres', data: solicitudes });
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
    const solicitud = await em.findOneOrFail(
      SolicitudEvento,
      { id },
      { populate: ['campista', 'evento'] },
    );
    res.status(200).json({ message: 'found solicitud', data: solicitud });
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
    const solicitud = em.create(SolicitudEvento, req.body);
    await em.flush();
    res.status(201).json({ message: 'solicitud created', data: solicitud });
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
    const solicitud = await em.findOneOrFail(SolicitudEvento, { id });
    em.assign(solicitud, req.body);
    await em.flush();
    res.status(200).json({ message: 'solicitud updated' });
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
    const solicitud = em.getReference(SolicitudEvento, id);
    await em.removeAndFlush(solicitud);
    res.status(200).send({ message: 'solicitud deleted' });
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
