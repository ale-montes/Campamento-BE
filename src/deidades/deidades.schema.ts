import { z } from 'zod';

export const DeidadSchema = z.object({
  nombre: z
    .string()
    .min(2, 'Nombre requerido')
    .max(100)
    .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/, 'Nombre inválido'),
  descripcion: z.string().min(10).max(500),
  elemento: z.string().min(2, 'Elemento requerido').max(100),
});

export const DeidadUpdateSchema = DeidadSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'Debes enviar al menos un campo para actualizar',
  },
);
