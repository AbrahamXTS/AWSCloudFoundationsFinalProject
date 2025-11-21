import { sql } from "bun";

import { pg } from "../../configuration";
import type { Student } from "../../models";

import type { StudentRepository } from "../StudentRepository";

export class PostgresStudentRepository implements StudentRepository {
	async findAll(): Promise<Student[]> {
		return await pg`SELECT * FROM students`;
	}

	async findById(id: number): Promise<Student | null> {
		const rows = await pg`SELECT * FROM students WHERE id = ${id} LIMIT 1`;

		return rows[0] ?? null;
	}

	async save(student: Student): Promise<Student> {
		if (student.id) {
			const rows =
				await pg`UPDATE students SET ${sql(student)} WHERE id = ${student.id} RETURNING *`;
			return rows[0];
		} else {
			const rows = await pg`INSERT INTO students ${sql(student)} RETURNING *`;
			return rows[0];
		}
	}

	async delete(id: number): Promise<void> {
		await pg`DELETE FROM students WHERE id = ${id}`;
	}
}
