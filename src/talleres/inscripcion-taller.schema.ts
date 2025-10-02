import { z } from 'zod';

export const InscripcionTallerSchema = z
  .object({
    tallerId: z.number().int().positive(),
    estado: z.enum(['aceptado', 'rechazado', 'pendiente']).optional(),
    nota: z.number().min(0).max(100).optional(),
    comentario: z.string().max(500).optional(),
  })
  .partial();
