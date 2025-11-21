import type { Context } from "hono";

import { BadRequestException, ResourceNotFoundException } from "../exceptions";

export const exceptionHandler = async (error: Error, context: Context) => {
	console.log(`[ERROR] ${error.message}`);

	if (error instanceof BadRequestException) {
		return context.json({ message: error.message }, 400);
	}

	if (error instanceof ResourceNotFoundException) {
		return context.json({ message: error.message }, 404);
	}

	return context.json({ message: "Unknown server error" }, 500);
};
