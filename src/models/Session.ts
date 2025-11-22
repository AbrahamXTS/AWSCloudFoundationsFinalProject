import z from "zod";

export const SessionSchema = z.object({
	id: z.uuid().nonempty(),
	fecha: z.number().nonoptional(),
	alumnoId: z.number().nonoptional(),
	active: z.boolean().nonoptional(),
	sessionString: z.string().length(128).nonempty(),
});

export type Session = z.infer<typeof SessionSchema>;
