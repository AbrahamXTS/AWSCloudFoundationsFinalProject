import { bucketClient, ENV } from "../../configuration";

import type { StorageRepository } from "../StorageRepository";

export class S3StorageRepository implements StorageRepository {
	async uploadFile(file: File, destinationPath: string): Promise<string> {
		await bucketClient.write(destinationPath, file);

		return `https://${ENV.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${destinationPath}`;
	}
}
