import { ResourceNotFoundException } from "../exceptions";
import type { Student } from "../models";
import type { StorageRepository, StudentRepository } from "../repositories";

import type { NotificatorService } from "./NotificatorService";

export class StudentService {
	private readonly studentRepository: StudentRepository;
	private readonly storageRepository: StorageRepository;
	private readonly notificatorService: NotificatorService;

	constructor(
		storageRepository: StorageRepository,
		studentRepository: StudentRepository,
		notificatorService: NotificatorService,
	) {
		this.storageRepository = storageRepository;
		this.studentRepository = studentRepository;
		this.notificatorService = notificatorService;
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

	async notifyStudentInformation(id: number) {
		const student = await this.getStudentById(id);

		await this.notificatorService.sendNotification(
			"arn:aws:sns:us-east-1:658012973760:student-grades-topic",
			`
			Esta es la información que solicitaste:

			- Matrícula: ${student.matricula}
			- Nombre: ${student.nombres} ${student.apellidos}
			- Promedio: ${student.promedio}
			`,
		);
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
