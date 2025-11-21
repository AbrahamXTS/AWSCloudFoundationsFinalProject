import type { Teacher } from "../../models";
import type { TeacherRepository } from "../TeacherRepository";

export class InMemoryTeacherRepository implements TeacherRepository {
	private readonly teachers = new Map<number, Teacher>();

	async findAll(): Promise<Teacher[]> {
		return Array.from(this.teachers.values());
	}

	async findById(id: number): Promise<Teacher | null> {
		return this.teachers.get(id) ?? null;
	}

	async save(teacher: Teacher): Promise<Teacher> {
		this.teachers.set(teacher.id!, teacher);

		return teacher;
	}

	async delete(id: number): Promise<void> {
		this.teachers.delete(id);
	}
}
