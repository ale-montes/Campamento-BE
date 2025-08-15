import { Entity, ManyToOne, OneToMany, Collection, Rel, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Deidad } from '../deidades/deidad.entity.js';
import { Hospeda } from './hospeda.entity.js';

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

  @ManyToOne(() => Deidad, { nullable: false })
  deidad!: Rel<Deidad>;

  @OneToMany(() => Hospeda, (hospeda) => hospeda.cabania)
  hospedajes = new Collection<Hospeda>(this);
}
