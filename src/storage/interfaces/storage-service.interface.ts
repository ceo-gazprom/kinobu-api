export interface IStorageService {
  upload(file: Buffer, filename?: string, bucket?: string): Promise<string>;
}
