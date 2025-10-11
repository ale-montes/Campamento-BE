import { z } from 'zod';

export const adminSchema = z.object({
  nombre: z.string().min(2).max(100),
  apellido: z.string().min(2).max(100),
  email: z.string().email(),
  telefono: z.string().min(6),
  contrasena: z.string().min(6),
  activo: z.boolean().optional().default(true),
  isVerified: z.boolean().optional().default(false),
});

export type AdminInput = z.infer<typeof adminSchema>;

export const adminUpdateSchema = adminSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });
