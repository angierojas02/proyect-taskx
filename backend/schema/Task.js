import { z } from 'zod'

const taskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    priority: z.enum(['Alta', 'Baja', 'Media' ]),
    status: z.enum(['Pendiente', 'En proceso', 'Completada' ]).default('Pendiente'),
    userId: z
    .string({ required_error: 'El userId es obligatorio' })
    .min(1, { message: 'El ID de usuario no es válido' })
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'El userId debe ser un ObjectId de MongoDB válido' })
})

export function validateTask (object) {
    return taskSchema.safeParse(object)
}

