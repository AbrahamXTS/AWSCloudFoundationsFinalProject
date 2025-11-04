import { Hono } from "hono";
import z from "zod";

import { BadRequestException } from "../exceptions";
import { StudentSchema } from "../models";
import { InMemoryStudentRepository } from "../repositories/implementations";
import { StudentService } from "../services";

export const studentRoutes = new Hono();

const studentRepository = new InMemoryStudentRepository();
const studentService = new StudentService(studentRepository);

studentRoutes.get("/", async (context) => {
	const students = await studentService.getAllStudents();

	return context.json(students);
});

studentRoutes.get("/:id", async (context) => {
	const id = Number(context.req.param("id"));

	const student = await studentService.getStudentById(id);

	return context.json(student);
});

studentRoutes.post("/", async (context) => {
	const body = await context.req.json();

	const parsedBody = StudentSchema.safeParse(body);

	if (!parsedBody.success) {
		throw new BadRequestException(z.prettifyError(parsedBody.error));
	}

	const student = await studentService.createStudent(parsedBody.data);

	return context.json(student, 201);
});

studentRoutes.put("/:id", async (context) => {
	const id = Number(context.req.param("id"));
	const body = await context.req.json();

	const parsedBody = StudentSchema.safeParse(body);

	if (!parsedBody.success) {
		throw new BadRequestException(z.prettifyError(parsedBody.error));
	}

	const student = await studentService.updateStudent(id, parsedBody.data);

	return context.json(student);
});

studentRoutes.delete("/:id", async (context) => {
	const id = Number(context.req.param("id"));

	await studentService.deleteStudent(id);

	return context.newResponse(null, 200);
});
