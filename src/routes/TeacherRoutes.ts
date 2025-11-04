import { Hono } from "hono";
import z from "zod";

import { BadRequestException } from "../exceptions";
import { TeacherSchema } from "../models";
import { InMemoryTeacherRepository } from "../repositories/implementations";
import { TeacherService } from "../services";

export const teacherRoutes = new Hono();

const teacherRepository = new InMemoryTeacherRepository();
const teacherService = new TeacherService(teacherRepository);

teacherRoutes.get("/", async (context) => {
	const teachers = await teacherService.getAllTeachers();

	return context.json(teachers);
});

teacherRoutes.get("/:id", async (context) => {
	const id = Number(context.req.param("id"));

	const teacher = await teacherService.getTeacherById(id);

	return context.json(teacher);
});

teacherRoutes.post("/", async (context) => {
	const body = await context.req.json();

	const parsedBody = TeacherSchema.safeParse(body);

	if (!parsedBody.success) {
		throw new BadRequestException(z.prettifyError(parsedBody.error));
	}

	const teacher = await teacherService.createTeacher(parsedBody.data);

	return context.json(teacher, 201);
});

teacherRoutes.put("/:id", async (context) => {
	const id = Number(context.req.param("id"));
	const body = await context.req.json();

	const parsedBody = TeacherSchema.safeParse(body);

	if (!parsedBody.success) {
		throw new BadRequestException(z.prettifyError(parsedBody.error));
	}

	const teacher = await teacherService.updateTeacher(id, parsedBody.data);

	return context.json(teacher);
});

teacherRoutes.delete("/:id", async (context) => {
	const id = Number(context.req.param("id"));

	await teacherService.deleteTeacher(id);

	return context.newResponse(null, 200);
});
