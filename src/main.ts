import { Hono } from "hono";

import { ENV } from "./configuration";
import { exceptionHandler } from "./middlewares";
import { studentRoutes, teacherRoutes } from "./routes";

const app = new Hono();

app.route("/alumnos", studentRoutes);
app.route("/profesores", teacherRoutes);

app.onError(exceptionHandler);

export default {
	port: ENV.SERVER_PORT,
	fetch: app.fetch,
};
