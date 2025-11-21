export interface StorageRepository {
	uploadFile(file: File, destinationPath: string): Promise<string>;
}
