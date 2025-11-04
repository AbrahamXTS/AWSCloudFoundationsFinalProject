import { ResourceNotFoundException } from "../exceptions";
import type { Teacher } from "../models";
import type { TeacherRepository } from "../repositories";

export class TeacherService {
	private teacherRepository: TeacherRepository;

	constructor(teacherRepository: TeacherRepository) {
		this.teacherRepository = teacherRepository;
	}

	async getTeacherById(id: number) {
		const teacher = await this.teacherRepository.findById(id);

		if (!teacher) {
			throw new ResourceNotFoundException(`Teacher with id ${id} not found`);
		}

		return this.teacherRepository.findById(id);
	}

	async getAllTeachers() {
		return this.teacherRepository.findAll();
	}

	async createTeacher(teacher: Teacher) {
		return this.teacherRepository.save(teacher);
	}

	async updateTeacher(id: number, teacher: Teacher) {
		const existingTeacher = await this.teacherRepository.findById(id);

		if (!existingTeacher) {
			throw new ResourceNotFoundException(`Teacher with id ${id} not found`);
		}

		return this.teacherRepository.save({
			...teacher,
			id,
		});
	}

	async deleteTeacher(id: number) {
		const teacher = await this.teacherRepository.findById(id);

		if (!teacher) {
			throw new ResourceNotFoundException(`Teacher with id ${id} not found`);
		}

		return this.teacherRepository.delete(id);
	}
}
