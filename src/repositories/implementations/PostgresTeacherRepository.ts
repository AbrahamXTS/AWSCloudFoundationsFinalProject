import { SQL, sql } from "bun";

import { ENV } from "../../configuration";
import type { Teacher } from "../../models";

import type { TeacherRepository } from "../TeacherRepository";

export class PostgresTeacherRepository implements TeacherRepository {
	private readonly pg;

	constructor() {
		this.pg = new SQL(ENV.DATABASE_URL, {
			tls: true,
		});
	}

	async findAll(): Promise<Teacher[]> {
		return await this.pg`SELECT * FROM teachers`;
	}

	async findById(id: number): Promise<Teacher | null> {
		const rows = await this.pg`SELECT * FROM teachers WHERE id = ${id} LIMIT 1`;

		return rows[0] ?? null;
	}

	async save(teacher: Teacher): Promise<Teacher> {
		if (teacher.id) {
			const rows = await this
				.pg`UPDATE teachers SET ${sql(teacher)} WHERE id = ${teacher.id} RETURNING *`;
			return rows[0];
		} else {
			const rows = await this
				.pg`INSERT INTO teachers ${sql(teacher)} RETURNING *`;
			return rows[0];
		}
	}

	async delete(id: number): Promise<void> {
		await this.pg`DELETE FROM teachers WHERE id = ${id}`;
	}
}
