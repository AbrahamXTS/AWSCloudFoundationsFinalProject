import { ResourceNotFoundException } from "../exceptions";
import type { Student } from "../models";
import type { StudentRepository } from "../repositories";
import type { StorageRepository } from "../repositories/StorageRepository";

export class StudentService {
	private readonly studentRepository: StudentRepository;
	private readonly storageRepository: StorageRepository;

	constructor(
		storageRepository: StorageRepository,
		studentRepository: StudentRepository,
	) {
		this.storageRepository = storageRepository;
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
		return await this.studentRepository.findAll();
	}

	async createStudent(student: Student) {
		return await this.studentRepository.save(student);
	}

	async updateStudentProfilePicture(id: number, profilePicture: File) {
		const uploadedProfilePictureURL = await this.storageRepository.uploadFile(
			profilePicture,
			`profile-pictures/${id}.${profilePicture.name.split(".").pop()}`,
		);

		return await this.updateStudent(id, {
			fotoPerfilUrl: uploadedProfilePictureURL,
		});
	}

	async updateStudent(id: number, student: Partial<Student>) {
		const existingStudent = await this.getStudentById(id);

		return await this.studentRepository.save({
			...existingStudent,
			...student,
			id,
		});
	}

	async deleteStudent(id: number) {
		await this.getStudentById(id);

		return await this.studentRepository.delete(id);
	}
}
