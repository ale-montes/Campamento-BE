import { EntityManager, LockMode } from '@mikro-orm/core';
import { AsignaMision } from './asigna-mision.entity.js';
import { NotFoundError, BadRequestError } from '../shared/errors/http-error.js';
import { validateId } from '../shared/validateParam.js';
import { UserPayload } from '../types/user.js';
import { AsignaMisionInputInstructor } from './asigna-mision.schema.js';
import { PeriodoService } from '../periodo/periodo.service.js';

export class AsignaMisionService {
  private periodoService = new PeriodoService();
  async findAll(user: UserPayload, em: EntityManager): Promise<AsignaMision[]> {
    const { id } = await this.periodoService.getVigente(em);
    if (user.role === 'campista') {
      return await em.find(
        AsignaMision,
        { campista: user.id, periodo: id },
        { populate: ['mision', 'campista', 'periodo'] },
      );
    }
    return await em.find(AsignaMision, {}, { populate: ['mision', 'campista', 'periodo'] });
  }

  async findOne(user: UserPayload, idAsignacion: number, em: EntityManager): Promise<AsignaMision> {
    const { id } = await this.periodoService.getVigente(em);
    if (user.role === 'campista') {
      const asignaMision = await em.findOne(
        AsignaMision,
        {
          id: idAsignacion,
          periodo: id,
          campista: user.id,
        },
        { populate: ['mision', 'campista', 'periodo'] },
      );
      if (!asignaMision) throw new NotFoundError('Inscripción');
      return asignaMision;
    }
    const asignaMision = await em.findOne(
      AsignaMision,
      { mision: idAsignacion },
      { populate: ['mision', 'campista', 'periodo'] },
    );
    if (!asignaMision) throw new NotFoundError('AsignaMision');
    return asignaMision;
  }

  async add(user: UserPayload, data: AsignaMisionInputInstructor, em: EntityManager): Promise<AsignaMision> {
    if (user.role !== 'instructor' && user.role !== 'admin') throw new BadRequestError('No tiene permisos para crear');
    const asignaMision = em.create(AsignaMision, data);
    await em.persistAndFlush(asignaMision);
    return asignaMision;
  }

  async update(id: number, data: Partial<AsignaMision>, user: UserPayload, em: EntityManager): Promise<AsignaMision> {
    validateId(id);
    if (user.role !== 'instructor' && user.role !== 'admin')
      throw new BadRequestError('No tiene permisos para actualizar');

    return await em.transactional(async (tEm) => {
      const asignaMision = await tEm.findOne(AsignaMision, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
      if (!asignaMision) throw new NotFoundError('AsignaMision');

      tEm.assign(asignaMision, data);
      await tEm.flush();
      return asignaMision;
    });
  }

  async remove(id: number, user: UserPayload, em: EntityManager): Promise<void> {
    validateId(id);
    if (user.role !== 'instructor') throw new BadRequestError('No tiene permisos para eliminar');
    const asignaMision = await em.findOne(AsignaMision, { id });
    if (!asignaMision) throw new NotFoundError('AsignaMision');
    await em.removeAndFlush(asignaMision);
  }
}
