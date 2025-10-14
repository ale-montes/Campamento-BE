import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Cabania } from './cabania.entity.js';
import { Campista } from '../usuarios/campista.entity.js';
import { Periodo } from '../periodo/periodo.entity.js';

type EstadoHospedaje = 'reservada' | 'finalizada';

@Entity()
export class Hospeda extends BaseEntity {
  @ManyToOne(() => Cabania, { nullable: false })
  cabania!: Rel<Cabania>;

  @ManyToOne(() => Campista, { nullable: false })
  campista!: Rel<Campista>;

  @Property({ nullable: false })
  fechaInicio!: Date;

  @Property({ nullable: true })
  fechaFin?: Date;

  @Property({ nullable: true })
  estado!: EstadoHospedaje;

  @ManyToOne(() => Periodo, { nullable: false })
  periodo!: Rel<Periodo>;
}
