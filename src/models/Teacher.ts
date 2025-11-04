import z from "zod";

export const TeacherSchema = z.object({
	id: z.number().int().positive(),
	numeroEmpleado: z.number().int().positive(),
	nombres: z.string().nonempty(),
	apellidos: z.string().nonempty(),
	horasClase: z.number().min(0),
});

export interface Teacher {
	id: number;
	numeroEmpleado: number;
	nombres: string;
	apellidos: string;
	horasClase: number;
}
