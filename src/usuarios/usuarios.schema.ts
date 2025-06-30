import { z } from 'zod';

export const usuarioSchema = z.object({
  nombre: z
    .string()
    .min(1, 'Nombre requerido')
    .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/),
  apellido: z
    .string()
    .min(1, 'Apellido requerido')
    .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/),
  email: z.string().email(),
  nick: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9]+$/, 'Solo letras y números permitidos'),
  contrasena: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      'La contraseña debe tener mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo especial',
    ),
  fechaNac: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  direccion: z
    .string()
    .min(5)
    .regex(/^[a-zA-Z0-9\s]+$/, 'Solo letras y números permitidos'),
  alergia: z.string().regex(/^[a-zA-Z]+$/, 'Solo letras permitidas'),
  grupoSanguineo: z.enum(['A', 'B', 'AB', 'O']),
  rh: z.enum(['+', '-']),
});
