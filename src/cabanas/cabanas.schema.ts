// import { z } from 'zod';

// export const cabanaSchema = z.object({
//   nombreCabana: z
//     .string()
//     .min(1, 'Nombre de la cabaña requerido')
//     .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\s]+$/, 'Letras, números y espacios permitidos'),
//   dios: z
//     .string()
//     .min(1, 'Dios requerido')
//     .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/),
//   campistas: z.array(z.string().min(0)),
// });

// export const cabanaUpdateSchema = cabanaSchema
//   .partial()
//   .refine((data) => Object.keys(data).length > 0, {
//     message: 'Debes enviar al menos un campo para actualizar',
//   });
