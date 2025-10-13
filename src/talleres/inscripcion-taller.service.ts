import { EntityManager, LockMode } from '@mikro-orm/core';
import { InscripcionTaller } from './inscripcion-taller.entity.js';
import { NotFoundError, ForbiddenError } from '../shared/errors/http-error.js';
import { validateId } from '../shared/validateParam.js';
import { UserPayload } from '../types/user.js';
import { InscripcionTallerInput } from './inscripcion-taller.schema.js';

export class InscripcionTallerService {
  async findAll(user: UserPayload, em: EntityManager): Promise<InscripcionTaller[]> {
    if (user.role === 'campista') {
      return await em.find(InscripcionTaller, { campista: user.id }, { populate: ['taller'] });
    }
    return await em.find(InscripcionTaller, {}, { populate: ['taller'] });
  }

  async findOne(id: number, user: UserPayload, em: EntityManager): Promise<InscripcionTaller> {
    validateId(id);
    if (user.role === 'campista' && id !== user.id) {
      throw new ForbiddenError('No autorizado');
    }
    const inscripcion = await em.findOne(InscripcionTaller, { id }, { populate: ['taller'] });
    if (!inscripcion) throw new NotFoundError('Inscripción');
    return inscripcion;
  }

  async add(
    inscripcionData: InscripcionTallerInput,
    em: EntityManager,
  ): Promise<InscripcionTaller> {
    const inscripcion = em.create(InscripcionTaller, inscripcionData);
    await em.persistAndFlush(inscripcion);
    return inscripcion;
  }

  async update(
    id: number,
    inscripcionData: Partial<InscripcionTaller>,
    em: EntityManager,
  ): Promise<void> {
    validateId(id);
    await em.transactional(async (tEm) => {
      const inscripcion = await tEm.findOne(
        InscripcionTaller,
        { id },
        { lockMode: LockMode.PESSIMISTIC_WRITE },
      );
      if (!inscripcion) throw new NotFoundError('Inscripción');
      tEm.assign(inscripcion, inscripcionData);
      await tEm.flush();
    });
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const inscripcion = await em.findOne(InscripcionTaller, { id });
    if (!inscripcion) throw new NotFoundError('Inscripción');
    await em.removeAndFlush(inscripcion);
  }
}
