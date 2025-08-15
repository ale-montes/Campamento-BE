// taller.entity.ts
import { Entity, Property, ManyToOne, Cascade, Collection, Rel, OneToMany } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Instructor } from '../usuarios/instructor.entity.js';
import { InscripcionTaller } from '../talleres/inscripcion-taller.entity.js';

@Entity()
export class Taller extends BaseEntity {
  @Property({ nullable: false })
  titulo!: string;

  @Property({ nullable: false })
  descripcion!: string;

  @Property({ nullable: false })
  fechaHora!: Date;

  @Property({ nullable: false })
  lugar!: string;

  @ManyToOne(() => Instructor, { nullable: false })
  instructor!: Rel<Instructor>;

  @OneToMany(() => InscripcionTaller, (inscripcion) => inscripcion.taller, {
    cascade: [Cascade.ALL],
  })
  inscripciones = new Collection<InscripcionTaller>(this);
}
