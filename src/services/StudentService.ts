import { ResourceNotFoundException } from "../exceptions";
import type { Student } from "../models";
import type { StudentRepository } from "../repositories";

export class StudentService {
	private readonly studentRepository: StudentRepository;

	constructor(studentRepository: StudentRepository) {
		this.studentRepository = studentRepository;
	}

	async getStudentById(id: number) {
		const student = await this.studentRepository.findById(id);

		if (!student) {
			throw new ResourceNotFoundException(`Student with id ${id} not found`);
		}

		return student;
	}

	async getAllStudents() {
		return this.studentRepository.findAll();
	}

	async createStudent(student: Student) {
		return this.studentRepository.save(student);
	}

	async updateStudent(id: number, student: Student) {
		const existingStudent = await this.studentRepository.findById(id);

		if (!existingStudent) {
			throw new ResourceNotFoundException(`Student with id ${id} not found`);
		}

		return this.studentRepository.save({
			...student,
			id,
		});
	}

	async deleteStudent(id: number) {
		const student = await this.studentRepository.findById(id);

		if (!student) {
			throw new ResourceNotFoundException(`Student with id ${id} not found`);
		}

		return this.studentRepository.delete(id);
	}
}
