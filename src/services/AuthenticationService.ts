import { randomBytes } from "node:crypto";

import { BadRequestException } from "../exceptions";
import type { Session } from "../models";
import type { AuthenticationRepository } from "../repositories";

import type { StudentService } from "./StudentService";

export class AuthenticationService {
	private readonly studentService: StudentService;
	private readonly authenticationRepository: AuthenticationRepository;

	constructor(
		studentService: StudentService,
		authenticationRepository: AuthenticationRepository,
	) {
		this.studentService = studentService;
		this.authenticationRepository = authenticationRepository;
	}

	async loginStudent(studentId: number, studentPassword: string) {
		const student = await this.studentService.getStudentById(studentId);

		if (student.password !== studentPassword) {
			throw new BadRequestException("Invalid student credentials");
		}

		const sessionString = randomBytes(64).toString("hex");

		const session: Session = {
			id: crypto.randomUUID(),
			alumnoId: studentId,
			fecha: Date.now(),
			active: true,
			sessionString,
		};

		await this.authenticationRepository.save(session);

		return { sessionString };
	}

	async verifyStudentSession(studentId: number, sessionString: string) {
		const session =
			await this.authenticationRepository.findSessionByStudentIdAndSessionId(
				studentId,
				sessionString,
			);

		if (session?.active !== true) {
			throw new BadRequestException("Invalid session");
		}

		return session;
	}

	async logoutStudent(studentId: number, sessionString: string) {
		const session =
			await this.authenticationRepository.findSessionByStudentIdAndSessionId(
				studentId,
				sessionString,
			);

		if (!session) {
			throw new BadRequestException("Invalid session");
		}

		session.active = false;

		await this.authenticationRepository.save(session);

		return session;
	}
}
