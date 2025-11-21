export const ENV = {
	SERVER_PORT: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000,

	AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? "",
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? "",
	AWS_SESSION_TOKEN: process.env.AWS_SESSION_TOKEN ?? "",
	AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME ?? "",
	AWS_S3_REGION: process.env.AWS_S3_REGION ?? "",

	DATABASE_URL: process.env.DATABASE_URL ?? "",
};
