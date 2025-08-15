// admin.entity.ts
import { Entity } from '@mikro-orm/core';
import { Usuario } from './usuario.entity.js';

@Entity()
export class Admin extends Usuario {}
