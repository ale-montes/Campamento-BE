import { z } from 'zod';

// Enum de grupo sanguíneo
export const grupoSanguineoEnum = z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);

// Regex para validación de teléfonos (con prefijo + opcional)
const telefonoRegex = /^\+?[0-9]{7,15}$/;

// Esquema principal del campista
export const campistaSchema = z.object({
  nombre: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, {
      message: 'El nombre solo puede contener letras, espacios, guiones y apóstrofes',
    }),
  apellido: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, {
      message: 'El nombre solo puede contener letras, espacios, guiones y apóstrofes',
    }),
  email: z.string().email(),
  telefono: z
    .string()
    .regex(telefonoRegex, 'Número de teléfono inválido')
    .min(6, 'El teléfono debe tener al menos 6 caracteres')
    .max(15, 'El teléfono debe tener un máximo de 15 caracteres'),
  contrasena: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .regex(
      /^[a-zA-Z0-9@*_!¡?¿[{}()]{6,30}$/,
      'La contraseña solo puede contener caracteres alfanuméricos y los símbolos @, *, _,?,¿,!,¡,{,},(,)',
    ),
  fechaNac: z.coerce
    .date()
    .refine((date) => date <= new Date(), {
      message: 'La fecha de nacimiento no puede ser en el futuro',
    })
    .refine(
      (date) => {
        const age = new Date().getFullYear() - date.getFullYear();
        return age >= 18; // Validar que el usuario sea mayor de 18 años
      },
      {
        message: 'El campista debe ser mayor de 18 años',
      },
    )
    .optional(),
  pais: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, {
      message: 'El nombre solo puede contener letras, espacios, guiones y apóstrofes',
    })
    .optional(),
  ciudad: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, {
      message: 'El nombre solo puede contener letras, espacios, guiones y apóstrofes',
    })
    .optional(),
  direccion: z.string().min(2).max(100).optional(),
  alergias: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, {
      message: 'El nombre solo puede contener letras, espacios, guiones y apóstrofes',
    })
    .optional(),
  grupoSanguineo: grupoSanguineoEnum.optional(),
  telefonoEmergencia: z
    .string()
    .regex(telefonoRegex, 'Número de teléfono de emergencia inválido')
    .min(6, 'El teléfono de emergencia debe tener al menos 6 caracteres')
    .max(15, 'El teléfono de emergencia debe tener un máximo de 20 caracteres')
    .optional(),
  activo: z.boolean().optional().default(true),
  isVerified: z.boolean().optional(),
  verificationToken: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  contrasena: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .regex(
      /^[a-zA-Z0-9@*_!¡?¿[{}()]{6,30}$/,
      'La contraseña solo puede contener caracteres alfanuméricos y los símbolos @, *, _,?,¿,!,¡,{,},(,)',
    ),
});

// Esquema para actualizaciones parciales (validación de al menos un campo)
export const campistaUpdateSchema = campistaSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'Debes enviar al menos un campo para actualizar',
});

// Tipos inferidos para uso posterior
export type CampistaInput = z.infer<typeof campistaSchema>;
export type CampistaUpdateInput = z.infer<typeof campistaUpdateSchema>;
