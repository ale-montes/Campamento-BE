import { Entity, Property, OneToMany, Collection, Cascade, Filter } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { AsignaMision } from '../misiones/asigna-mision.entity.js';

@Entity()
@Filter({ name: 'activeMision', cond: { isActive: true }, default: true })
export class Mision extends BaseEntity {
  @Property({ nullable: false })
  titulo!: string;

  @Property({ nullable: false })
  descripcion!: string;

  @Property({ nullable: false })
  recompensa?: string;

  @Property({ nullable: true })
  pista?: string;

  @Property({ nullable: false, default: true })
  isActive?: boolean;

  @OneToMany(() => AsignaMision, (asigna) => asigna.mision, { cascade: [Cascade.ALL] })
  campistasAsignados = new Collection<AsignaMision>(this);
}
