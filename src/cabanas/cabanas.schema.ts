import { z } from 'zod';

export const cabanaSchema = z.object({
  nombre: z
    .string()
    .min(1, 'Nombre de la cabaña requerido')
    .regex(
      /^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\s\-\:\.']+$/,
      'Letras, números, espacios y algunos símbolos permitidos',
    ),
  capacidad: z.number().int().positive('La capacidad debe ser un número positivo'),
  descripcion: z.string().min(1, 'Descripción requerida'),
  ubicacion: z.string().min(1, 'Ubicación requerida'),
  deidad: z.number().int('Debe ser un id válido de deidad'),
});

export const cabanaUpdateSchema = cabanaSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });
