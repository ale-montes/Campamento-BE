import { Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';

export abstract class Usuario extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  apellido!: string;

  @Property({ unique: true, nullable: false })
  email!: string;

  @Property({ unique: true, nullable: false })
  nick!: string;

  @Property({ nullable: false })
  contrasena!: string;

  @Property({ nullable: false })
  fechaNac!: Date;

  @Property({ nullable: false })
  direccion!: string;

  @Property({ nullable: true })
  alergias?: string;

  @Property({ nullable: true })
  grupoSanguineo?: string;

  @Property({ nullable: true })
  rh?: string;
}

//### Herencia de tabla por clase concreta
// @OneToOne(() => Campista, (campista) => campista.usuario, {
//   nullable: true,
//   cascade: [Cascade.PERSIST, Cascade.REMOVE],
//   orphanRemoval: true,
// })
// campista?: Campista;

// @OneToOne(() => Instructor, (instructor) => instructor.usuario, {
//   nullable: true,
//   cascade: [Cascade.PERSIST, Cascade.REMOVE],
//   orphanRemoval: true,
// })
// instructor?: Instructor;

// @OneToOne(() => Admin, (admin) => admin.usuario, {
//   nullable: true,
//   cascade: [Cascade.PERSIST, Cascade.REMOVE],
//   orphanRemoval: true,
// })
// admin?: Admin;

//### Herencia de una sola tabla
// @Entity({
//   discriminatorColumn: 'type',
//   discriminatorMap: { usuario: 'Usuario', campista: 'Campista', instructor: 'Instructor', admin: 'Admin' },
// })
