import type { Session } from "../models/Session";

export interface AuthenticationRepository {
	findSessionByStudentIdAndSessionId(
		studentId: number,
		sessionId: string,
	): Promise<Session | null>;

	save(session: Session): Promise<Session>;
}
