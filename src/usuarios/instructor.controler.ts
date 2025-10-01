import { Request, Response } from 'express';
import { Instructor } from './instructor.entity.js';
import { orm } from '../shared/db/orm.js';
import bcrypt from 'bcryptjs';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const instructores = await em.find(Instructor, {});
    const instructoresSanitized = instructores.map(({ contrasena: _omit, ...rest }) => rest);
    res.status(200).json({ message: 'found all instructores', data: instructoresSanitized });
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
    const { contrasena: _omit, ...instructorSanitized } = await em.findOneOrFail(Instructor, {
      id,
    });
    res.status(200).json({ message: 'found user', data: instructorSanitized });
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
    const { contrasena, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const token = crypto.randomUUID();
    const instructor = em.create(Instructor, {
      ...rest,
      contrasena: hashedPassword,
      isVerified: false,
      verificationToken: token,
    });
    await em.flush();
    res
      .status(201)
      .json({ message: 'user created, email pendient the verification', email: instructor.email });
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
    const instructor = em.getReference(Instructor, id);
    em.assign(instructor, req.body);
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
    const instructor = em.getReference(Instructor, id);
    await em.removeAndFlush(instructor);
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
