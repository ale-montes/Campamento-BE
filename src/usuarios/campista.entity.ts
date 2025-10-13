import { Entity, Collection, OneToMany, Cascade } from '@mikro-orm/core';
import { Usuario } from './usuario.entity.js';
import { InscripcionTaller } from '../talleres/inscripcion-taller.entity.js';
import { SolicitudEvento } from '../eventos/solicitud-evento.entity.js';
import { AsignaMision } from '../misiones/asigna-mision.entity.js';
import { Hospeda } from '../cabanas/hospeda.entity.js';
import { InscripcionPeriodo } from '../periodo/inscripcion-periodo.entity.js';

@Entity()
export class Campista extends Usuario {
  @OneToMany(() => InscripcionTaller, (inscripcion) => inscripcion.campista, {
    cascade: [Cascade.ALL],
  })
  talleresInscriptos = new Collection<InscripcionTaller>(this);

  @OneToMany(() => InscripcionPeriodo, (inscripcion) => inscripcion.campista, {
    cascade: [Cascade.ALL],
  })
  InscripcionPeriodo = new Collection<InscripcionPeriodo>(this);

  @OneToMany(() => SolicitudEvento, (solicitud) => solicitud.campista, {
    cascade: [Cascade.ALL],
  })
  solicitudes = new Collection<SolicitudEvento>(this);

  @OneToMany(() => AsignaMision, (asigna) => asigna.campista, {
    cascade: [Cascade.ALL],
  })
  misionesAsignadas = new Collection<AsignaMision>(this);

  @OneToMany(() => Hospeda, (hospeda) => hospeda.campista, {
    cascade: [Cascade.ALL],
  })
  hospedajes = new Collection<Hospeda>(this);
}
