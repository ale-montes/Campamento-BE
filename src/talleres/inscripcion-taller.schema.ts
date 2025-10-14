import { z } from 'zod';

// INPUT SCHEMAS

export const inscripTallerSchema = z.object({
  taller: z.number().int().positive(),
  campista: z.number().int().positive().optional(),
  estado: z.enum(['aceptado', 'rechazado', 'pendiente']).optional().default('aceptado'),
  nota: z.number().int().min(0).max(100).optional(),
  comentario: z.string().min(1).max(500).optional(),
});

export type InscripcionTallerInput = z.infer<typeof inscripTallerSchema>;

export const inscripTallerUpdateSchema = inscripTallerSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'Debes enviar al menos un campo para actualizar',
});

// OUTPUT SCHEMAS

// Datos públicos del taller
export const TallerSchema = z
  .object({
    id: z.number(),
    titulo: z.string(),
    descripcion: z.string(),
    fechaHora: z.date().or(z.string()),
    lugar: z.string(),
    estado: z.string(),
  })
  .strip(); // elimina propiedades no definidas

// Datos públicos del campista
export const CampistaSchema = z
  .object({
    id: z.number(),
    nombre: z.string(),
    apellido: z.string(),
    email: z.string(),
    telefono: z.string(),
  })
  .strip();

// Estructura de salida de una inscripción
export const InscripcionResponseSchema = z
  .object({
    id: z.number(),
    estado: z.string(),
    nota: z.number().nullable().optional(),
    comentario: z.string().nullable().optional(),
    createdAt: z.date().or(z.string()),
    updatedAt: z.date().or(z.string()),
    taller: TallerSchema,
    campista: CampistaSchema.optional(),
  })
  .strip();

// Lista de inscripciones
export const ListaInscripcionesResponseSchema = z.array(InscripcionResponseSchema);

// Tipos derivados para TypeScript
export type InscripcionResponse = z.infer<typeof InscripcionResponseSchema>;
export type ListaInscripcionesResponse = z.infer<typeof ListaInscripcionesResponseSchema>;
