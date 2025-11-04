import type { Teacher } from "../models";

export interface TeacherRepository {
	findAll(): Promise<Teacher[]>;

	findById(id: number): Promise<Teacher | null>;

	save(teacher: Teacher): Promise<Teacher>;

	delete(id: number): Promise<void>;
}
