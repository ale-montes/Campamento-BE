import { Request, Response } from 'express';
import { Taller } from './taller.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const talleres = await em.find(Taller, {}, { populate: ['instructor'] });

    const talleresSanitizados = talleres.map((taller) => ({
      id: taller.id,
      titulo: taller.titulo,
      descripcion: taller.descripcion,
      fechaHora: taller.fechaHora,
      lugar: taller.lugar,
      instructor: {
        nombre: taller.instructor.nombre,
        apellido: taller.instructor.apellido,
      },
    }));
    res.status(200).json({ message: 'found all talleres', data: talleresSanitizados });
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
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const taller = await em.findOne(Taller, { id }, { populate: ['instructor'] });
    if (!taller) {
      return res.status(404).json({ message: `not found` });
    }
    res.status(200).json({ message: 'found taller', data: taller });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}

async function add(req: Request, res: Response) {
  try {
    const taller = em.create(Taller, req.body);
    await em.flush();
    res.status(201).json({ message: 'taller created', data: taller });
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
    const taller = em.getReference(Taller, id);
    em.assign(taller, req.body);
    await em.flush();
    res.status(200).json({ message: 'taller updated' });
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
    const taller = em.getReference(Taller, id);
    await em.removeAndFlush(taller);
    res.status(200).send({ message: 'taller deleted' });
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
