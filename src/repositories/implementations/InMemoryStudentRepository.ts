import type { Student } from "../../models";
import type { StudentRepository } from "../StudentRepository";

export class InMemoryStudentRepository implements StudentRepository {
	private readonly students = new Map<number, Student>();

	async findAll(): Promise<Student[]> {
		return Array.from(this.students.values());
	}

	async findById(id: number): Promise<Student | null> {
		return this.students.get(id) ?? null;
	}

	async save(student: Student): Promise<Student> {
		this.students.set(student.id!, student);

		return student;
	}

	async delete(id: number): Promise<void> {
		this.students.delete(id);
	}
}
