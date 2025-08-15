// import { z } from 'zod';

// export const usuarioSchema = z.object({
//   nombre: z
//     .string()
//     .min(1, 'Nombre requerido')
//     .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/),
//   apellido: z
//     .string()
//     .min(1, 'Apellido requerido')
//     .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/),
//   email: z.string().email(),
//   nick: z
//     .string()
//     .min(3)
//     .regex(/^[a-zA-Z0-9]+$/, 'Solo letras y números permitidos'),
//   contrasena: z
//     .string()
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!¿?])[A-Za-z\d@$#!¿?\s]{8,}$/,
//       'La contraseña debe tener mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo especial',
//     ),
//   fechaNac: z
//     .string()
//     .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido: YYYY-MM-DD')
//     .refine((val) => !isNaN(Date.parse(val)), { message: 'Fecha inválida' }),
//   direccion: z
//     .string()
//     .min(5)
//     .regex(/^[a-zA-Z0-9\s.,áéíóúÁÉÍÓÚñÑ-]+$/, 'Dirección inválida'),
//   alergia: z.string().regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo letras permitidas'),
//   grupoSanguineo: z.enum(['A', 'B', 'AB', 'O']),
//   rh: z.enum(['+', '-']),
// });

// export const usuarioUpdateSchema = usuarioSchema
//   .partial()
//   .refine((data) => Object.keys(data).length > 0, {
//     message: 'Debes enviar al menos un campo para actualizar',
//   });
