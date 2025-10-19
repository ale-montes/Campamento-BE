import { EntityManager, LockMode } from '@mikro-orm/core';
import { Periodo } from './periodo.entity.js';
import { PeriodoInput } from './periodo.schema.js';
import { NotFoundError } from '../shared/errors/http-error.js';
import { validateId } from '../shared/validateParam.js';

export class PeriodoService {
  private cachedPeriodo?: Periodo;

  async findAll(em: EntityManager): Promise<Periodo[]> {
    return em.find(Periodo, {});
  }

  async findOne(id: number, em: EntityManager): Promise<Periodo> {
    validateId(id);
    const periodo = await em.findOne(Periodo, { id });
    if (!periodo) throw new NotFoundError(`Periodo con id ${id} no encontrado`);
    return periodo;
  }

  async add(data: PeriodoInput, em: EntityManager): Promise<Periodo> {
    const periodo = em.create(Periodo, data);
    await em.persistAndFlush(periodo);
    return periodo;
  }

  async update(id: number, data: Partial<Periodo>, em: EntityManager): Promise<Periodo> {
    validateId(id);
    const updatedPeriodo = await em.transactional(async (tEm) => {
      const periodo = await tEm.findOne(Periodo, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
      if (!periodo) throw new NotFoundError(`Periodo con id ${id} no encontrado`);
      tEm.assign(periodo, data);
      await tEm.flush();
      return periodo;
    });
    return updatedPeriodo;
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const periodo = await em.findOne(Periodo, { id });
    if (!periodo) throw new NotFoundError(`Periodo con id ${id} no encontrado`);
    await em.removeAndFlush(periodo);
  }

  async getVigente(em: EntityManager): Promise<Periodo> {
    const now = new Date();

    if (this.cachedPeriodo) {
      if (now >= this.cachedPeriodo.fechaInicioPer && now <= this.cachedPeriodo.fechaFinPer) {
        // El periodo cacheado sigue vigente
        return this.cachedPeriodo;
      } else {
        // El periodo expiró, limpiamos cache
        this.cachedPeriodo = undefined;
      }
    }

    const periodo = await em.findOne(Periodo, { estado: 'en curso' });
    if (!periodo) throw new NotFoundError('No hay periodo en curso');

    this.cachedPeriodo = periodo;
    return periodo;
  }
}
