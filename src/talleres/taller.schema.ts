import { z } from 'zod';

export const tallerSchema = z.object({
  titulo: z.string().min(2).max(100),
  descripcion: z.string().min(10).max(500),
  fechaHora: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
      message: 'formato ISO 8601 UTC (ej: 2025-08-01T19:00:00.000Z)',
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Fecha y hora deben ser válidas',
    }),
  lugar: z.string().min(2).max(100),
  instructor: z.number().min(1).max(1000),
  cupo: z.number().int().min(1).max(1000),
  duracionMin: z.number().int().min(0).max(480),
  estado: z
    .enum(['abierto', 'cerrado', 'en progreso', 'cancelado', 'completado'])
    .optional()
    .default('abierto'),
});
export type TallerInput = z.infer<typeof tallerSchema>;
export const tallerUpdateSchema = tallerSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });
