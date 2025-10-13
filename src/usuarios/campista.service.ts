import { EntityManager, LockMode } from '@mikro-orm/core';
import { Campista } from './campista.entity.js';
import { CampistaInput } from './campista.schema.js';
import { ConflictError, InternalServerError, NotFoundError } from '../shared/errors/http-error.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { validateId } from '../shared/validateParam.js';

export class CampistaService {
  async findAll(em: EntityManager): Promise<Omit<Campista, 'contrasena'>[]> {
    const campistas = await em.find(Campista, {});
    return campistas.map(({ contrasena: _omit, ...rest }) => rest);
  }

  async findOne(id: number, em: EntityManager): Promise<Omit<Campista, 'contrasena'>> {
    validateId(id);
    const campista = await em.findOne(Campista, { id });
    if (!campista) throw new NotFoundError('Campista');
    const { contrasena: _omit, ...sanitized } = campista;
    return sanitized;
  }

  async findByEmail(email: string, em: EntityManager): Promise<Campista | null> {
    return em.findOne(Campista, { email });
  }

  async findByVerificationToken(token: string, em: EntityManager): Promise<Campista | null> {
    return em.findOne(Campista, { verificationToken: token });
  }

  async add(role: string, data: CampistaInput, em: EntityManager): Promise<Omit<Campista, 'contrasena'>> {
    const existing = await em.findOne(Campista, { email: data.email });
    if (existing) {
      throw new ConflictError('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(data.contrasena, 10);
    const token = crypto.randomUUID();

    if (role === 'campista') {
      data.isVerified = false;
      data.verificationToken = token;
    } else {
      data.isVerified = true;
      data.verificationToken = undefined;
    }

    const campista = em.create(Campista, {
      ...data,
      contrasena: hashedPassword,
    });

    try {
      await em.persistAndFlush(campista);
    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        const dbError = error as { code: string };
        if (dbError.code === 'ER_DUP_ENTRY') {
          throw new ConflictError('El email ya está registrado');
        }
      }
      throw new InternalServerError('Error al crear el campista', error);
    }

    const { contrasena: _omit, ...sanitized } = campista;
    return sanitized;
  }

  async update(id: number, data: Partial<Campista>, em: EntityManager): Promise<Omit<Campista, 'contrasena'>> {
    validateId(id);
    const updated = await em.transactional(async (tEm) => {
      const campista = await tEm.findOne(Campista, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
      if (!campista) throw new NotFoundError(`Campista ${id} no encontrado`);
      if (data.contrasena) {
        data.contrasena = await bcrypt.hash(data.contrasena, 10);
      }
      tEm.assign(campista, data);
      await tEm.flush();
      const { contrasena: _omit, ...sanitized } = campista;
      return sanitized;
    });
    return updated;
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const campista = await em.findOne(Campista, { id });
    if (!campista) throw new NotFoundError(`Campista ${id} no encontrado`);
    await em.removeAndFlush(campista);
  }
}
