export interface NotificatorService {
	sendNotification(recipient: string, message: string): Promise<void>;
}
