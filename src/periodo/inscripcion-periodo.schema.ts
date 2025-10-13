// src/inscripcion-periodo/inscripcion-periodo.schema.ts
import { z } from 'zod';

export const inscripPeriodoSchema = z.object({
  periodo: z.number().int().positive(),
  campista: z.number().int().positive(),
  metodoPago: z.enum(['TRANSFERENCIA', 'MERCADOPAGO', 'EFECTIVO', 'TARJETA', 'OTRO']),
  referenciaPago: z.string().min(1).max(100),
  estado: z.enum(['PAGADO', 'CANCELADO', 'RECHAZADO', 'PENDIENTE']).default('PENDIENTE'),
});

export type InscripcionPeriodoInput = z.infer<typeof inscripPeriodoSchema>;

export const inscripPeriodoUpdateSchema = inscripPeriodoSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });
