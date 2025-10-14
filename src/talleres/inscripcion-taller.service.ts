import { EntityManager, LockMode } from '@mikro-orm/core';
import { InscripcionTaller } from './inscripcion-taller.entity.js';
import { BadRequestError, NotFoundError } from '../shared/errors/http-error.js';
import { validateId } from '../shared/validateParam.js';
import { UserPayload } from '../types/user.js';
import { InscripcionTallerInput } from './inscripcion-taller.schema.js';
import { PeriodoService } from '../periodo/periodo.service.js';
import { TallerService } from './taller.service.js';

export class InscripcionTallerService {
  private periodoService = new PeriodoService();
  private tallerService = new TallerService();

  async findAll(user: UserPayload, em: EntityManager): Promise<InscripcionTaller[]> {
    if (user.role === 'campista') {
      const { id } = await this.periodoService.getVigente(em);
      const inscripciones = await em.find(
        InscripcionTaller,
        {
          campista: user.id,
          taller: { periodo: id },
        },
        { populate: ['taller'] },
      );
      return inscripciones;
    }
    const inscripciones = await em.find(InscripcionTaller, {}, { populate: ['taller', 'campista'] });
    return inscripciones;
  }

  async findOne(inscripTallerId: number, user: UserPayload, em: EntityManager): Promise<InscripcionTaller> {
    if (user.role === 'campista') {
      const inscripcion = await em.findOne(
        InscripcionTaller,
        {
          id: inscripTallerId,
          campista: user.id,
        },
        { populate: ['taller'] },
      );
      if (!inscripcion) throw new NotFoundError('Inscripción');
      return inscripcion;
    }
    const inscripcion = await em.findOne(InscripcionTaller, { id: inscripTallerId }, { populate: ['taller'] });
    if (!inscripcion) throw new NotFoundError('Inscripción');
    return inscripcion;
  }

  async add(inscripcionData: InscripcionTallerInput, user: UserPayload, em: EntityManager): Promise<InscripcionTaller> {
    const periodoVigente = await this.periodoService.getVigente(em);

    if (user.role === 'campista') {
      inscripcionData.campista = user.id;
      inscripcionData.estado = 'pendiente';
      delete inscripcionData.nota;
      delete inscripcionData.comentario;
      const taller = await this.tallerService.findOne(inscripcionData.taller, em);
      if (!taller) throw new NotFoundError('Taller');
      if (taller.periodo.id !== periodoVigente.id) {
        throw new BadRequestError('Solo puedes inscribirte a talleres del período vigente');
      }
    }
    if (typeof inscripcionData.campista === 'undefined') {
      throw new BadRequestError('Falta el ID del campista');
    }
    const yaInscripto = await em.findOne(InscripcionTaller, {
      campista: inscripcionData.campista,
      taller: {
        id: inscripcionData.taller,
        periodo: periodoVigente.id,
      },
    });
    if (yaInscripto) {
      throw new BadRequestError('Ya estás inscripto a este taller');
    }

    const data = {
      ...inscripcionData,
      campista: inscripcionData.campista!,
    };

    const inscripcion = em.create(InscripcionTaller, data);
    await em.persistAndFlush(inscripcion);
    return inscripcion;
  }

  async update(id: number, inscripcionData: Partial<InscripcionTaller>, em: EntityManager): Promise<void> {
    validateId(id);
    await em.transactional(async (tEm) => {
      const inscripcion = await tEm.findOne(InscripcionTaller, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
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
