import { Entity, Property, OneToMany, Collection, Cascade } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { InscripcionPeriodo } from '../periodo/inscripcion-periodo.entity.js';
import { Taller } from '../talleres/taller.entity.js';

type EstadoPeriodo = 'cerrado' | 'abierto' | 'en curso' | 'finalizado';
@Entity()
export class Periodo extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  descripcion!: string;

  @Property({ nullable: false })
  fechaInicioPer!: Date;

  @Property({ nullable: false })
  fechaFinPer!: Date;

  @Property({ nullable: false })
  fechaInicioInsc!: Date;

  @Property({ nullable: false })
  fechaFinInsc!: Date;

  @Property({ nullable: false, default: 'cerrado' })
  estado!: EstadoPeriodo;

  @OneToMany(() => InscripcionPeriodo, (inscripcion) => inscripcion.periodo, {
    cascade: [Cascade.ALL],
  })
  incriptos = new Collection<InscripcionPeriodo>(this);

  @OneToMany(() => Taller, (taller) => taller.periodo, {
    cascade: [Cascade.ALL],
  })
  talleres = new Collection<Taller>(this);
}
