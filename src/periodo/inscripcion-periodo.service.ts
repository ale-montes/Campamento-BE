import { EntityManager, LockMode } from '@mikro-orm/core';
import { InscripcionPeriodo } from './inscripcion-periodo.entity.js';
import { Periodo } from '../periodo/periodo.entity.js';
import { NotFoundError, BadRequestError } from '../shared/errors/http-error.js';
import { validateId } from '../shared/validateParam.js';
import { InscripcionPeriodoInput } from './inscripcion-periodo.schema.js';

export class InscripcionPeriodoService {
  async findAll(em: EntityManager): Promise<InscripcionPeriodo[]> {
    return await em.find(InscripcionPeriodo, {}, { populate: ['periodo', 'campista'] });
  }

  async findOne(id: number, em: EntityManager): Promise<InscripcionPeriodo> {
    validateId(id);
    const inscripcion = await em.findOne(
      InscripcionPeriodo,
      { id },
      { populate: ['periodo', 'campista'] },
    );
    if (!inscripcion) throw new NotFoundError('Inscripción de periodo');
    return inscripcion;
  }

  async add(
    inscripcionData: InscripcionPeriodoInput,
    em: EntityManager,
  ): Promise<InscripcionPeriodo> {
    const periodo = await em.findOne(Periodo, { id: inscripcionData.periodo });
    if (!periodo) throw new NotFoundError('Periodo');
    if (periodo.estado !== 'abierto') {
      throw new BadRequestError('El periodo no está abierto para inscripciones.');
    }

    const inscripcion = em.create(InscripcionPeriodo, inscripcionData);
    await em.persistAndFlush(inscripcion);
    return inscripcion;
  }

  async update(id: number, data: Partial<InscripcionPeriodo>, em: EntityManager): Promise<void> {
    validateId(id);
    await em.transactional(async (tEm) => {
      const inscripcion = await tEm.findOne(
        InscripcionPeriodo,
        { id },
        { lockMode: LockMode.PESSIMISTIC_WRITE },
      );
      if (!inscripcion) throw new NotFoundError('Inscripción de periodo');
      tEm.assign(inscripcion, data);
      await tEm.flush();
    });
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const inscripcion = await em.findOne(InscripcionPeriodo, { id });
    if (!inscripcion) throw new NotFoundError('Inscripción de periodo');
    await em.removeAndFlush(inscripcion);
  }
}
