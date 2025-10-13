// import { EntityManager } from '@mikro-orm/core';
// import { InscripcionPeriodo } from './inscripcion-periodo.entity.js';

// class InscripcionesPeriodoCache {
//   private campistasPagados: Set<number> = new Set();

//   async cargar(em: EntityManager, periodoId: number) {
//     const inscripciones = await em.find(InscripcionPeriodo, {
//       periodo: periodoId,
//       estado: 'PAGADO',
//     });
//     this.campistasPagados = new Set(inscripciones.map((i) => i.campista.id));
//   }

//   estaHabilitado(campistaId: number): boolean {
//     return this.campistasPagados.has(campistaId);
//   }

//   actualizarEstado(campistaId: number, estado: string) {
//     if (estado === 'PAGADO') {
//       this.campistasPagados.add(campistaId);
//     } else {
//       this.campistasPagados.delete(campistaId);
//     }
//   }
// }
