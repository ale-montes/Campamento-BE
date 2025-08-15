import { Entity, Property, OneToMany, Collection, Cascade } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Cabania } from '../cabanas/cabania.entity.js';

@Entity()
export class Deidad extends BaseEntity {
  @Property({ unique: true, nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  descripcion!: string;

  @Property({ nullable: false })
  lema!: string;

  @Property({ nullable: false })
  simbolo!: string;

  @OneToMany(() => Cabania, (cabania) => cabania.deidad, {
    cascade: [Cascade.ALL],
  })
  cabanias = new Collection<Cabania>(this);
}
