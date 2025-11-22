import { Hono } from "hono";

import {
	DynamoDBAuthenticationRepository,
	PostgresStudentRepository,
	S3StorageRepository,
} from "../repositories/implementations";
import {
	AuthenticationService,
	SNSNotificatorService,
	StudentService,
} from "../services";

export const authenticationRouter = new Hono();

const studentRepository = new PostgresStudentRepository();
const storageRepository = new S3StorageRepository();
const notificatorService = new SNSNotificatorService();

const studentService = new StudentService(
	storageRepository,
	studentRepository,
	notificatorService,
);

const authenticationRepository = new DynamoDBAuthenticationRepository();

const authenticationService = new AuthenticationService(
	studentService,
	authenticationRepository,
);

authenticationRouter.post("/:id/session/login", async (context) => {
	const id = Number(context.req.param("id"));

	const { password } = await context.req.json();

	const sessionString = await authenticationService.loginStudent(id, password);

	return context.json(sessionString, 200);
});

authenticationRouter.post("/:id/session/verify", async (context) => {
	const id = Number(context.req.param("id"));

	const { sessionString } = await context.req.json();

	const session = await authenticationService.verifyStudentSession(
		id,
		sessionString,
	);

	return context.json(session, 200);
});

authenticationRouter.post("/:id/session/logout", async (context) => {
	const id = Number(context.req.param("id"));

	const { sessionString } = await context.req.json();

	const session = await authenticationService.logoutStudent(id, sessionString);

	return context.json(session, 200);
});
