// src/inscripcion-taller/inscripcion-taller.schema.ts
import { z } from 'zod';

export const inscripTallerSchema = z.object({
  taller: z.number().int().positive(),
  campista: z.number().int().positive(),
  estado: z.enum(['aceptado', 'rechazado', 'pendiente']).optional().default('pendiente'),
  nota: z.number().int().min(0).max(100).optional(),
  comentario: z.string().min(1).max(500).optional(),
});

export type InscripcionTallerInput = z.infer<typeof inscripTallerSchema>;

export const inscripTallerUpdateSchema = inscripTallerSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });
