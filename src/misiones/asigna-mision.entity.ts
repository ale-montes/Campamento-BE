// asigna-mision.entity.ts
import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Campista } from '../usuarios/campista.entity.js';
import { Mision } from './mision.entity.js';
import { Periodo } from '../periodo/periodo.entity.js';

type EstadoMision = 'en progreso' | 'completada' | 'fallida' | 'rechazada' | 'asignada';

@Entity()
export class AsignaMision extends BaseEntity {
  @ManyToOne(() => Campista, { nullable: false })
  campista!: Rel<Campista>;

  @ManyToOne(() => Mision, { nullable: false })
  mision!: Rel<Mision>;

  @Property()
  estado!: EstadoMision;

  @ManyToOne(() => Periodo, { nullable: false })
  periodo!: Rel<Periodo>;
}
