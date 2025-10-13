import { EntityManager, LockMode } from '@mikro-orm/core';
import { Taller } from './taller.entity.js';
import { TallerInput } from './taller.schema.js';
import { NotFoundError } from '../shared/errors/http-error.js';
import { validateId } from '../shared/validateParam.js';
import { PeriodoService } from '../periodo/periodo.service.js';
import { UserPayload } from '../types/user.js';

export class TallerService {
  private periodoService = new PeriodoService();

  async findAll(user: UserPayload, em: EntityManager): Promise<Taller[]> {
    if (user.role === 'campista') {
      const { id: periodoVigenteId } = await this.periodoService.getVigente(em);
      const talleres = await em.find(Taller, { periodo: periodoVigenteId }, { populate: ['periodo'] });
      return talleres;
    }
    const talleres = await em.find(Taller, {});
    return talleres;
  }

  async findOne(id: number, em: EntityManager): Promise<Taller> {
    const taller = await em.findOne(Taller, { id });
    if (!taller) throw new NotFoundError('Taller');
    return taller;
  }

  async add(tallerData: TallerInput, em: EntityManager): Promise<Taller> {
    const taller = em.create(Taller, tallerData);
    await em.persistAndFlush(taller);
    return taller;
  }

  async update(id: number, tallerData: Partial<Taller>, em: EntityManager): Promise<Taller> {
    validateId(id);
    const updatedTaller = em.transactional(async (tEm) => {
      const taller = await tEm.findOne(Taller, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
      if (!taller) {
        throw new NotFoundError(`Taller with id ${id} not found`);
      }
      tEm.assign(taller, tallerData);
      await tEm.flush();
      return taller;
    });
    return updatedTaller;
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const taller = await em.findOne(Taller, { id });
    if (!taller) {
      throw new NotFoundError(`Taller with id ${id} not found`);
    }
    await em.removeAndFlush(taller);
  }
}
