import { Entity, Property, OneToMany, Collection, Cascade } from '@mikro-orm/core';
import { Usuario } from './usuario.entity.js';
import { Taller } from '../talleres/taller.entity.js';

@Entity()
export class Instructor extends Usuario {
  @Property()
  especialidad!: string;

  @Property()
  nivel!: number;

  @OneToMany(() => Taller, (taller) => taller.instructor, {
    cascade: [Cascade.ALL],
  })
  talleresDictados = new Collection<Taller>(this);
}

// @OneToOne(() => Usuario, { owner: true, deleteRule: 'CASCADE' })
// usuario!: Usuario;
