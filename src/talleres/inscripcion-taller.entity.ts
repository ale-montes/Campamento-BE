import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Campista } from '../usuarios/campista.entity.js';
import { Taller } from './taller.entity.js';

type EstadoTaller = 'aceptado' | 'rechazado' | 'pendiente';

@Entity()
export class InscripcionTaller extends BaseEntity {
  @ManyToOne(() => Campista, { nullable: false })
  campista!: Rel<Campista>;

  @ManyToOne(() => Taller, { nullable: false })
  taller!: Rel<Taller>;

  @Property({ nullable: true, default: 'aceptado' })
  estado?: EstadoTaller;

  @Property({ nullable: true })
  nota?: number;

  @Property({ nullable: true })
  comentario?: string;
}
