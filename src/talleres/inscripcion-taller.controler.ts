import { Request, Response } from 'express';
import { InscripcionTaller } from './inscripcion-taller.entity.js';
import { orm } from '../shared/db/orm.js';
import { Periodo } from '../periodo/periodo.entity.js';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    if (req.user?.role === 'campista') {
      const id = req.user.id;
      const inscripciones = await em.findOneOrFail(
        InscripcionTaller,
        { campista: Number(id) },
        { populate: ['taller'] },
      );
      res.status(200).json({ message: 'found inscripciones', data: inscripciones });
    } else {
      const inscripciones = await em.find(InscripcionTaller, {}, { populate: ['taller'] });
      res.status(200).json({ message: 'found inscripciones', data: inscripciones });
    }
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
    if (req.user?.role === 'campista' && req.user?.id !== id) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    const inscripcion = await em.findOneOrFail(InscripcionTaller, { id }, { populate: ['taller'] });
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

async function findAllYourOwn(req: Request, res: Response) {
  try {
    // 1. Obtener el usuario autenticado
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    const { id } = req.user;

    // 2. Buscar el periodo 'en curso'
    const periodo = await em.findOne(Periodo, { estado: 'en curso' });
    if (!periodo) {
      return res.status(404).json({ message: 'No hay periodo en curso' });
    }

    const { fechaInicioPer, fechaFinPer } = periodo;

    // 3. Buscar inscripciones del campista dentro de las fechas del periodo
    const inscripciones = await em.find(
      InscripcionTaller,
      {
        campista: Number(id),
        createdAt: {
          $gte: fechaInicioPer,
          $lte: fechaFinPer,
        },
      },
      { populate: ['taller'] },
    );

    res.status(200).json({ message: 'found talleres del periodo actual', data: inscripciones });
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

export { findAll, findOne, add, update, remove, findAllYourOwn };
