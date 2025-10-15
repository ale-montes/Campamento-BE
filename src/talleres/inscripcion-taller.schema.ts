import { z } from 'zod';

/* -------------------------- INPUT SCHEMAS -------------------------- */

// Input Admin
export const inscripcionTallerInputSchemaAdmin = z.object({
  campista: z.number().int().positive(), // id de campista
  taller: z.number().int().positive(), // id de taller
  estado: z.enum(['aceptado', 'rechazado', 'pendiente']).default('pendiente'),
  nota: z.number().min(0).max(10).optional(),
  comentario: z.string().max(500).optional(),
});

// Input Campista (puede inscribirse a un taller)
export const inscripcionTallerInputSchemaCampista = z.object({
  taller: z.number().int().positive(),
});

// Input Instructor (puede modificar estado o nota)
export const inscripcionTallerInputSchemaInstructor = z.object({
  estado: z.enum(['aceptado', 'rechazado', 'pendiente']).optional(),
  nota: z.number().min(0).max(10).optional(),
  comentario: z.string().max(500).optional(),
});

/* -------------------------- INPUT UPDATE SCHEMAS -------------------------- */

// Update Admin
export const inscripcionTallerInputUpdateSchemaAdmin = inscripcionTallerInputSchemaAdmin
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });

// Update Campista (puede cancelar o editar comentario)
export const inscripcionTallerInputUpdateSchemaCampista = z
  .object({
    comentario: z.string().max(500).optional(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });

// Update Instructor
export const inscripcionTallerInputUpdateSchemaInstructor = inscripcionTallerInputSchemaInstructor
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });

/* -------------------------- OUTPUT SCHEMAS -------------------------- */

const inscripcionTallerBaseOutput = {
  id: z.number(),
  estado: z.enum(['aceptado', 'rechazado', 'pendiente']),
  nota: z.number().nullable().optional(),
  comentario: z.string().nullable().optional(),
};

// Output Admin
export const inscripcionTallerOutputSchemaAdmin = z
  .object({
    ...inscripcionTallerBaseOutput,
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    campista: z.object({
      id: z.number(),
      nombre: z.string(),
      apellido: z.string(),
      email: z.string().email(),
    }),
    taller: z.object({
      id: z.number(),
      titulo: z.string(),
      descripcion: z.string(),
      fechaHora: z.string().or(z.date()),
      lugar: z.string(),
    }),
  })
  .strip();

// Output Campista
export const inscripcionTallerOutputSchemaCampista = z
  .object({
    ...inscripcionTallerBaseOutput,
    taller: z.object({
      id: z.number(),
      titulo: z.string(),
      descripcion: z.string(),
      fechaHora: z.string().or(z.date()),
      lugar: z.string(),
      estado: z.enum(['abierto', 'cerrado', 'en progreso', 'cancelado', 'completado']),
    }),
  })
  .strip();

// Output Instructor
export const inscripcionTallerOutputSchemaInstructor = z
  .object({
    ...inscripcionTallerBaseOutput,
    campista: z.object({
      id: z.number(),
      nombre: z.string(),
      apellido: z.string(),
      email: z.string().email(),
    }),
    taller: z.object({
      id: z.number(),
      titulo: z.string(),
      fechaHora: z.string().or(z.date()),
    }),
  })
  .strip();

/* -------------------------- TYPES -------------------------- */

export type InscripcionTallerInputAdmin = z.infer<typeof inscripcionTallerInputSchemaAdmin>;
export type InscripcionTallerUpdateInputAdmin = z.infer<typeof inscripcionTallerInputUpdateSchemaAdmin>;
export type InscripcionTallerOutputAdmin = z.infer<typeof inscripcionTallerOutputSchemaAdmin>;

export type InscripcionTallerInputCampista = z.infer<typeof inscripcionTallerInputSchemaCampista>;
export type InscripcionTallerUpdateInputCampista = z.infer<typeof inscripcionTallerInputUpdateSchemaCampista>;
export type InscripcionTallerOutputCampista = z.infer<typeof inscripcionTallerOutputSchemaCampista>;

export type InscripcionTallerInputInstructor = z.infer<typeof inscripcionTallerInputSchemaInstructor>;
export type InscripcionTallerUpdateInputInstructor = z.infer<typeof inscripcionTallerInputUpdateSchemaInstructor>;
export type InscripcionTallerOutputInstructor = z.infer<typeof inscripcionTallerOutputSchemaInstructor>;
