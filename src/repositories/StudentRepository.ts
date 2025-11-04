import type { Student } from "../models";

export interface StudentRepository {
	findAll(): Promise<Student[]>;

	findById(id: number): Promise<Student | null>;

	save(student: Student): Promise<Student>;

	delete(id: number): Promise<void>;
}
