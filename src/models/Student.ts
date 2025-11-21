import z from "zod";

export const StudentSchema = z.object({
	id: z.number().int().positive().optional(),
	nombres: z.string().nonempty(),
	apellidos: z.string().nonempty(),
	fotoPerfilUrl: z.url().optional(),
	matricula: z.string().nonempty(),
	promedio: z.number().min(0).max(100),
});

export type Student = z.infer<typeof StudentSchema>;
