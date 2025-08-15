import { Entity, Property, OneToMany, Collection, Cascade } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { AsignaMision } from '../misiones/asigna-mision.entity.js';

@Entity()
export class Mision extends BaseEntity {
  @Property({ nullable: false })
  titulo!: string;

  @Property({ nullable: false })
  descripcion!: string;

  @Property()
  recompensa?: string;

  @Property()
  pista?: string;

  @OneToMany(() => AsignaMision, (asigna) => asigna.mision, { cascade: [Cascade.ALL] })
  campistasAsignados = new Collection<AsignaMision>(this);
}
