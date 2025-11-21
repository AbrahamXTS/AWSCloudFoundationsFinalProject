import { Hono } from "hono";

import { ENV } from "./configuration";
import { exceptionHandler, methodNotAllowedHandler } from "./middlewares";
import { studentRouter, teacherRouter } from "./routers";

const app = new Hono();

app.route("/alumnos", studentRouter);
app.route("/profesores", teacherRouter);

app.use(methodNotAllowedHandler(app));
app.onError(exceptionHandler);

export default {
	port: ENV.SERVER_PORT,
	fetch: app.fetch,
};
