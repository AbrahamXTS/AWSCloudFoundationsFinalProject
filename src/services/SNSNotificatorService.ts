import { PublishCommand } from "@aws-sdk/client-sns";

import { snsClient } from "../configuration";

import type { NotificatorService } from "./NotificatorService";

export class SNSNotificatorService implements NotificatorService {
	async sendNotification(recipient: string, message: string): Promise<void> {
		const command = new PublishCommand({
			Message: message,
			TopicArn: recipient,
		});

		await snsClient.send(command);
	}
}
