import { EntityManager, LockMode } from '@mikro-orm/core';
import { Instructor } from './instructor.entity.js';
import { InstructorInput } from './instructor.schema.js';
import { NotFoundError } from '../shared/errors/http-error.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { validateId } from '../shared/validateParam.js';

export class InstructorService {
  async findAll(em: EntityManager): Promise<Omit<Instructor, 'contrasena'>[]> {
    const instructors = await em.find(Instructor, {});
    return instructors.map(({ contrasena: _omit, ...rest }) => rest);
  }

  async findOne(id: number, em: EntityManager): Promise<Omit<Instructor, 'contrasena'>> {
    validateId(id);
    const instructor = await em.findOne(Instructor, { id });
    if (!instructor) throw new NotFoundError('Instructor');
    const { contrasena: _omit, ...sanitized } = instructor;
    return sanitized;
  }

  async findByEmail(email: string, em: EntityManager): Promise<Instructor | null> {
    return em.findOne(Instructor, { email });
  }

  async findByVerificationToken(token: string, em: EntityManager): Promise<Instructor | null> {
    return em.findOne(Instructor, { verificationToken: token });
  }

  async add(data: InstructorInput, em: EntityManager): Promise<Omit<Instructor, 'contrasena'>> {
    const hashedPassword = await bcrypt.hash(data.contrasena, 10);
    const token = crypto.randomUUID();
    const instructor = em.create(Instructor, {
      ...data,
      contrasena: hashedPassword,
      isVerified: false,
      verificationToken: token,
    });
    await em.persistAndFlush(instructor);
    const { contrasena: _omit, ...sanitized } = instructor;
    return sanitized;
  }

  async update(
    id: number,
    data: Partial<Instructor>,
    em: EntityManager,
  ): Promise<Omit<Instructor, 'contrasena'>> {
    validateId(id);
    const updated = await em.transactional(async (tEm) => {
      const instructor = await tEm.findOne(
        Instructor,
        { id },
        { lockMode: LockMode.PESSIMISTIC_WRITE },
      );
      if (!instructor) throw new NotFoundError(`Instructor ${id} no encontrado`);
      tEm.assign(instructor, data);
      await tEm.flush();
      const { contrasena: _omit, ...sanitized } = instructor;
      return sanitized;
    });
    return updated;
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const instructor = await em.findOne(Instructor, { id });
    if (!instructor) throw new NotFoundError(`Instructor ${id} no encontrado`);
    await em.removeAndFlush(instructor);
  }
}
