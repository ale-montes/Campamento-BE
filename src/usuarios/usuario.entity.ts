import { Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';

type grupoSanguineo = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export abstract class Usuario extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  apellido!: string;

  @Property({ unique: true, nullable: false })
  email!: string;

  @Property({ nullable: false })
  telefono!: string;

  @Property({ nullable: false })
  contrasena!: string;

  @Property({ nullable: true })
  fechaNac?: Date;

  @Property({ nullable: true })
  pais?: string;

  @Property({ nullable: true })
  ciudad?: string;

  @Property({ nullable: true })
  direccion?: string;

  @Property({ nullable: true })
  alergias?: string;

  @Property({ nullable: true })
  grupoSanguineo?: grupoSanguineo;

  @Property({ nullable: true })
  telefonoEmergencia?: string;

  @Property({ nullable: false })
  activo?: boolean = true;

  @Property({ default: false })
  isVerified: boolean = false;

  @Property({ nullable: true })
  verificationToken?: string | null;
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
