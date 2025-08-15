import { Entity, Property, OneToMany, Collection, Cascade } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { SolicitudEvento } from '../eventos/solicitud-evento.entity.js';

@Entity()
export class Evento extends BaseEntity {
  @Property({ nullable: false })
  titulo!: string;

  @Property({ nullable: false })
  descripcion!: string;

  @Property({ nullable: false })
  fechahora!: Date;

  @Property({ nullable: false })
  lugar!: string;

  @OneToMany(() => SolicitudEvento, (solicitud) => solicitud.evento, { cascade: [Cascade.ALL] })
  solicitudes = new Collection<SolicitudEvento>(this);
}
