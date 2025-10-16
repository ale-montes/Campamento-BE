import { EntityManager, LockMode } from '@mikro-orm/core';
import { SolicitudEvento } from './solicitud-evento.entity.js';
import { NotFoundError, BadRequestError } from '../shared/errors/http-error.js';
import { validateId } from '../shared/validateParam.js';
import { UserPayload } from '../types/user.js';
import { SolicitudEventoInputAdmin } from './solicitud-evento.schema.js';
import { EventoService } from './evento.service.js';
import { PeriodoService } from '../periodo/periodo.service.js';

export class SolicitudEventoService {
  private periodoService = new PeriodoService();
  private eventoService = new EventoService();

  async findAll(user: UserPayload, em: EntityManager): Promise<SolicitudEvento[]> {
    const { id } = await this.periodoService.getVigente(em);
    if (user.role === 'campista') {
      const solicitudes = await em.find(
        SolicitudEvento,
        { campista: user.id, evento: { periodo: id } },
        { populate: ['evento'] },
      );
      return solicitudes;
    }
    const solicitudes = await em.find(SolicitudEvento, {}, { populate: ['evento', 'campista'] });
    return solicitudes;
  }

  async findOne(solicitudId: number, user: UserPayload, em: EntityManager): Promise<SolicitudEvento> {
    validateId(solicitudId);
    if (user.role === 'campista') {
      const solicitud = await em.findOne(
        SolicitudEvento,
        { id: solicitudId, campista: user.id },
        { populate: ['evento'] },
      );
      if (!solicitud) throw new NotFoundError('Solicitud');
      return solicitud;
    }
    const solicitud = await em.findOne(SolicitudEvento, { id: solicitudId }, { populate: ['evento', 'campista'] });
    if (!solicitud) throw new NotFoundError('Solicitud');
    return solicitud;
  }

  async add(solicitudData: SolicitudEventoInputAdmin, user: UserPayload, em: EntityManager): Promise<SolicitudEvento> {
    const idEvento = Number(solicitudData.evento);
    const periodoVigente = await this.periodoService.getVigente(em);
    const evento = await this.eventoService.findOne(idEvento, em);
    if (!evento) throw new NotFoundError('Evento');
    if (evento.periodo.id !== periodoVigente.id) {
      throw new BadRequestError('Solo puedes inscribirte a eventos del período vigente');
    }

    if (user.role === 'campista') {
      const idCampista = Number(user.id);
      solicitudData.campista = idCampista;
      solicitudData.estado = 'pendiente';
    }

    const yaSolicitado = await em.findOne(SolicitudEvento, {
      campista: solicitudData.campista,
      evento: {
        id: solicitudData.evento,
        periodo: periodoVigente.id,
      },
    });

    if (yaSolicitado) {
      throw new BadRequestError('Ya realizaste una solicitud para este evento');
    }

    const data = {
      ...solicitudData,
      campista: solicitudData.campista!,
    };

    const solicitud = em.create(SolicitudEvento, data);
    await em.persistAndFlush(solicitud);
    return solicitud;
  }

  async update(id: number, input: Partial<SolicitudEvento>, _user: UserPayload, em: EntityManager): Promise<void> {
    validateId(id);
    await em.transactional(async (tEm) => {
      const solicitud = await tEm.findOne(SolicitudEvento, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
      if (!solicitud) throw new NotFoundError('SolicitudEvento');

      // ya controlamos roles desde las rutas -> acá solo validamos datos
      if (input.estado && !['pendiente', 'aceptado', 'rechazado'].includes(input.estado)) {
        throw new BadRequestError('Estado inválido');
      }

      tEm.assign(solicitud, input);
      await tEm.flush();
    });
  }

  async remove(id: number, em: EntityManager): Promise<void> {
    validateId(id);
    const solicitud = await em.findOne(SolicitudEvento, { id });
    if (!solicitud) throw new NotFoundError('Solicitud');
    await em.removeAndFlush(solicitud);
  }
}
