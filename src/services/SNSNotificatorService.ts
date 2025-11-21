import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

import { ENV } from "../configuration";

import type { NotificatorService } from "./NotificatorService";

export class SNSNotificatorService implements NotificatorService {
	private readonly snsClient;

	constructor() {
		this.snsClient = new SNSClient({
			region: ENV.AWS_REGION,
			credentials: {
				accessKeyId: ENV.AWS_ACCESS_KEY_ID,
				secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
				sessionToken: ENV.AWS_SESSION_TOKEN,
			},
		});
	}

	async sendNotification(recipient: string, message: string): Promise<void> {
		const command = new PublishCommand({
			Message: message,
			TopicArn: recipient,
		});

		await this.snsClient.send(command);
	}
}
