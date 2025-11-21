import z from "zod";

export const TeacherSchema = z.object({
	id: z.number().int().positive().optional(),
	numeroEmpleado: z.number().int().positive(),
	nombres: z.string().nonempty(),
	apellidos: z.string().nonempty(),
	horasClase: z.number().min(0),
});

export type Teacher = z.infer<typeof TeacherSchema>;
