// solicitud-evento.entity.ts
import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Campista } from '../usuarios/campista.entity.js';
import { Evento } from './evento.entity.js';

type EstadoSolicitud = 'pendiente' | 'aceptado' | 'rechazado';

@Entity()
export class SolicitudEvento extends BaseEntity {
  @ManyToOne(() => Campista, { nullable: false })
  campista!: Rel<Campista>;

  @ManyToOne(() => Evento, { nullable: false })
  evento!: Rel<Evento>;

  @Property({ nullable: false })
  estado!: EstadoSolicitud;
}
