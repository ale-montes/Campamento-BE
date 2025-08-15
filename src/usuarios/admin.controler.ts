import { Request, Response } from 'express';
import { Admin } from './admin.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const admins = await em.find(Admin, {});
    const adminsSanitized = admins.map(({ contrasena: _omit, ...rest }) => rest);
    res.status(200).json({ message: 'found all admins', data: adminsSanitized });
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
    const { contrasena: _omit, ...adminSanitized } = await em.findOneOrFail(Admin, { id });
    res.status(200).json({ message: 'found user', data: adminSanitized });
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
    const { contrasena: _omit, ...adminSanitized } = em.create(Admin, req.body);
    await em.flush();
    res.status(201).json({ message: 'user created', data: adminSanitized });
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
    const admin = em.getReference(Admin, id);
    em.assign(admin, req.body);
    await em.flush();
    res.status(200).json({ message: 'user updated' });
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
    const admin = em.getReference(Admin, id);
    await em.removeAndFlush(admin);
    res.status(200).send({ message: 'user deleted' });
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
