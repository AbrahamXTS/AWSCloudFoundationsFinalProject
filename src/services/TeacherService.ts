import { ResourceNotFoundException } from "../exceptions";
import type { Teacher } from "../models";
import type { TeacherRepository } from "../repositories";

export class TeacherService {
	private readonly teacherRepository: TeacherRepository;

	constructor(teacherRepository: TeacherRepository) {
		this.teacherRepository = teacherRepository;
	}

	async getTeacherById(id: number) {
		const teacher = await this.teacherRepository.findById(id);

		if (!teacher) {
			throw new ResourceNotFoundException(`Teacher with id ${id} not found`);
		}

		return teacher;
	}

	async getAllTeachers() {
		return await this.teacherRepository.findAll();
	}

	async createTeacher(teacher: Teacher) {
		return await this.teacherRepository.save(teacher);
	}

	async updateTeacher(id: number, teacher: Partial<Teacher>) {
		const existingTeacher = await this.getTeacherById(id);

		return await this.teacherRepository.save({
			...existingTeacher,
			...teacher,
			id,
		});
	}

	async deleteTeacher(id: number) {
		await this.getTeacherById(id);

		return await this.teacherRepository.delete(id);
	}
}
