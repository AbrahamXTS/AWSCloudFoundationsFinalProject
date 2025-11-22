import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

import { dynamoDBClient } from "../../configuration";
import type { Session } from "../../models/Session";

import type { AuthenticationRepository } from "../AuthenticationRepository";

export class DynamoDBAuthenticationRepository
	implements AuthenticationRepository
{
	async findSessionByStudentIdAndSessionId(
		studentId: number,
		sessionString: string,
	): Promise<Session | null> {
		const res = await dynamoDBClient.send(
			new GetCommand({
				TableName: "aws-academy-sicei-sessions-database",
				Key: {
					alumnoId: studentId,
					sessionString: sessionString,
				},
			}),
		);

		return res.Item ? (res.Item as Session) : null;
	}

	async save(session: Session): Promise<Session> {
		if (session.id) {
			await dynamoDBClient.send(
				new UpdateCommand({
					TableName: "aws-academy-sicei-sessions-database",
					Key: {
						alumnoId: session.alumnoId,
						sessionString: session.sessionString,
					},
					UpdateExpression: "SET active = :active",
					ExpressionAttributeValues: {
						":active": session.active,
					},
				}),
			);
		} else {
			await dynamoDBClient.send(
				new PutCommand({
					TableName: "aws-academy-sicei-sessions-database",
					Item: session,
				}),
			);
		}

		return session;
	}
}
