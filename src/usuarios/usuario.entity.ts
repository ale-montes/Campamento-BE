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
  isVerified?: boolean = false;

  @Property({ nullable: true })
  verificationToken?: string | null;
}
