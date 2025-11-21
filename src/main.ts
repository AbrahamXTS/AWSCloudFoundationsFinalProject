import { Hono } from "hono";
import { logger } from "hono/logger";

import { ENV } from "./configuration";
import { exceptionHandler, methodNotAllowedHandler } from "./middlewares";
import { studentRouter, teacherRouter } from "./routers";

const app = new Hono();

app.use(logger());

app.route("/alumnos", studentRouter);
app.route("/profesores", teacherRouter);

app.onError(exceptionHandler);
app.use(methodNotAllowedHandler(app));

export default {
	port: ENV.SERVER_PORT,
	fetch: app.fetch,
};
