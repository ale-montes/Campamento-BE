import { Request, Response } from 'express';
import { Hospeda } from './hospeda.entity.js';
import { orm } from '../shared/db/orm.js';
import { Cabania } from '../cabanas/cabania.entity.js';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const hospedajes = await em.find(Hospeda, {}, { populate: ['campista', 'cabania'] });
    res.status(200).json({ message: 'found all hospedajes', data: hospedajes });
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
    const hospeda = await em.findOneOrFail(Hospeda, { id }, { populate: ['campista', 'cabania'] });
    res.status(200).json({ message: 'found hospeda', data: hospeda });
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
    const hospeda = em.create(Hospeda, req.body);
    await em.flush();
    res.status(201).json({ message: 'hospeda created', data: hospeda });
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
    const hospeda = await em.findOneOrFail(Hospeda, { id });

    // aceptar tanto cabania como cabania_id
    const cabaniaId = req.body.cabania ?? req.body.cabania_id;
    if (cabaniaId) {
      hospeda.cabania = em.getReference(Cabania, Number(cabaniaId));
    }

    // resto de campos simples
    em.assign(hospeda, { ...req.body, cabania: undefined, cabania_id: undefined });

    await em.flush();
    res.status(200).json({ message: 'hospeda updated', data: hospeda });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(500).json({ message: 'Unknown error' });
    }
  }
}

export async function moveCampista(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const nuevaCabaniaId = Number(req.body.cabania);

    if (!nuevaCabaniaId) {
      return res.status(400).json({ message: 'Debe enviar cabaña' });
    }

    const hospeda = await em.findOneOrFail(Hospeda, { id });

    // Cambiar la cabaña
    hospeda.cabania = em.getReference(Cabania, nuevaCabaniaId);

    await em.flush();

    res.status(200).json({ message: 'Campista movido correctamente', data: hospeda });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: 'Error al mover campista' });
    } else {
      res.status(500).json({ message: 'Error desconocido' });
    }
  }
}
async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const hospeda = em.getReference(Hospeda, id);
    await em.removeAndFlush(hospeda);
    res.status(200).send({ message: 'hospeda deleted' });
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
