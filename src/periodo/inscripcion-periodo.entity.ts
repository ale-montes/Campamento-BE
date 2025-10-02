// asigna-mision.entity.ts
import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Campista } from '../usuarios/campista.entity.js';
import { Periodo } from './periodo.entity.js';

type PeridoInscripcion = 'PAGADO' | 'CANCELADO' | 'RECHAZADO' | 'PENDIENTE';
type metodoPago = 'TRANSFERENCIA' | 'MERCADOPAGO' | 'EFECTIVO' | 'TARJETA' | 'OTRO';

@Entity()
export class InscripcionPeriodo extends BaseEntity {
  @ManyToOne(() => Campista, { nullable: false })
  campista!: Rel<Campista>;

  @ManyToOne(() => Periodo, { nullable: false })
  periodo!: Rel<Periodo>;

  @Property({ nullable: false })
  metodoPago?: metodoPago;

  @Property({ nullable: false })
  referenciaPago?: string;

  @Property({ nullable: false })
  estado!: PeridoInscripcion;
}
