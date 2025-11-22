import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { SNSClient } from "@aws-sdk/client-sns";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { S3Client, SQL } from "bun";

import { ENV } from "./environmentVariables";

export const pg = new SQL(ENV.DATABASE_URL, {
	tls: true,
	max: 10,
	maxLifetime: 3600,
	idleTimeout: 30,
});

export const bucketClient = new S3Client({
	accessKeyId: ENV.AWS_ACCESS_KEY_ID,
	secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
	sessionToken: ENV.AWS_SESSION_TOKEN,
	bucket: ENV.AWS_S3_BUCKET_NAME,
	region: ENV.AWS_REGION,
});

export const snsClient = new SNSClient({
	region: ENV.AWS_REGION,
	credentials: {
		accessKeyId: ENV.AWS_ACCESS_KEY_ID,
		secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
		sessionToken: ENV.AWS_SESSION_TOKEN,
	},
});

const dynamoDB = new DynamoDBClient({
	region: ENV.AWS_REGION,
	credentials: {
		accessKeyId: ENV.AWS_ACCESS_KEY_ID,
		secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
		sessionToken: ENV.AWS_SESSION_TOKEN,
	},
});

export const dynamoDBClient = DynamoDBDocumentClient.from(dynamoDB);
