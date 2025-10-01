import { Entity, ManyToOne, OneToMany, Collection, Rel, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Deidad } from '../deidades/deidad.entity.js';
import { Hospeda } from './hospeda.entity.js';
export enum cabinStatus {
  Activo = 'Activo',
  Inactivo = 'Inactivo',
}

@Entity()
export class Cabania extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  capacidad!: number;

  @Property({ nullable: false })
  descripcion!: string;

  @Property({ nullable: false })
  ubicacion!: string;

  @Property({ type: 'string', default: cabinStatus.Activo })
  cabinStatus!: cabinStatus;

  @ManyToOne(() => Deidad, { nullable: false })
  deidad!: Rel<Deidad>;

  @OneToMany(() => Hospeda, (hospeda) => hospeda.cabania)
  hospedajes = new Collection<Hospeda>(this);
}
