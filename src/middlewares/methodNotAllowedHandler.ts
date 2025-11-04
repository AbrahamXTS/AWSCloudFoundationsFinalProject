import type { Context, Hono, Next } from "hono";

export const methodNotAllowedHandler = (app: Hono) => {
	return async (context: Context, next: Next) => {
		await next();

		if (context.res.status === 404) {
			const path = context.req.path;

			const allowedMethods = app.routes
				.filter((route) => route.path === path)
				.map((route) => route.method.toUpperCase());

			if (allowedMethods.length > 0) {
				return context.newResponse(null, 405, {
					"Allowed-Methods": allowedMethods.join(", "),
				});
			}
		}
	};
};
