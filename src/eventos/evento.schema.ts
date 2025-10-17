import { z } from 'zod';

/* -------------------------- INPUT -------------------------- */

export const eventoInputSchema = z.object({
  titulo: z.string().min(3).max(100),
  descripcion: z.string().min(5).max(1000),
  fechahora: z.coerce.date(),
  lugar: z.string().min(3).max(200),
  periodo: z.number().int().positive(),
});

/* -------------------------- UPDATE -------------------------- */

export const eventoUpdateSchema = eventoInputSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, { message: 'Debes enviar al menos un campo para actualizar' });

/* -------------------------- OUTPUT -------------------------- */

const eventoBaseOutput = {
  id: z.number(),
  titulo: z.string(),
  descripcion: z.string(),
  fechahora: z.string().or(z.date()),
  lugar: z.string(),
};

/**
 * Output Admin: toda la info, incluyendo timestamps y periodo completo
 */
export const eventoOutputSchemaAdmin = z.object({
  ...eventoBaseOutput,
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  periodo: z.object({
    id: z.number(),
    nombre: z.string().optional(),
  }),
});

/**
 * Output Instructor: info básica + periodo id
 */
export const eventoOutputSchemaInstructor = z.object({
  ...eventoBaseOutput,
  periodo: z.object({
    id: z.number(),
    nombre: z.string().optional(),
  }),
});

/**
 * Output Campista: info mínima del evento
 */
export const eventoOutputSchemaCampista = z.object({
  ...eventoBaseOutput,
  periodo: z.object({
    id: z.number(),
    nombre: z.string().optional(),
  }),
});

/* -------------------------- TYPES -------------------------- */

export type EventoInput = z.infer<typeof eventoInputSchema>;
export type EventoUpdateInput = z.infer<typeof eventoUpdateSchema>;

export type EventoOutputAdmin = z.infer<typeof eventoOutputSchemaAdmin>;
export type EventoOutputInstructor = z.infer<typeof eventoOutputSchemaInstructor>;
export type EventoOutputCampista = z.infer<typeof eventoOutputSchemaCampista>;
