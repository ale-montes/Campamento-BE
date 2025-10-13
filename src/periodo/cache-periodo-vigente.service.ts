// import { EntityManager } from '@mikro-orm/core';
// import { Periodo } from './periodo.entity.js';

// class PeriodoContextService {
//   private periodoVigente: Periodo | null = null;

//   async init(em: EntityManager) {
//     const p = await em.findOne(Periodo, { estado: 'en curso' });
//     if (!p) throw new Error('No hay periodo vigente');
//     this.periodoVigente = p;
//   }

//   getVigente(): Periodo {
//     if (!this.periodoVigente) throw new Error('Periodo no inicializado');
//     return this.periodoVigente;
//   }

//   getVigenteId(): number {
//     return this.getVigente().id;
//   }

//   clear() {
//     this.periodoVigente = null;
//   }
// }
