import { S3Client } from "bun";

import { ENV } from "../../configuration";

import type { StorageRepository } from "../StorageRepository";

export class S3StorageRepository implements StorageRepository {
	async uploadFile(file: File, destinationPath: string): Promise<string> {
		const bucket = new S3Client({
			accessKeyId: ENV.AWS_ACCESS_KEY_ID,
			secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
			sessionToken: ENV.AWS_SESSION_TOKEN,
			bucket: ENV.AWS_S3_BUCKET_NAME,
			region: ENV.AWS_S3_REGION,
		});

		await bucket.write(destinationPath, file);

		return `https://${ENV.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${destinationPath}`;
	}
}
