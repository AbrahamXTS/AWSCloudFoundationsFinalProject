import { SQL } from "bun";

import { ENV } from "./environmentVariables";

export const pg = new SQL(ENV.DATABASE_URL, {
	tls: true,

	max: 10,
	maxLifetime: 3600,
	idleTimeout: 30,
});
