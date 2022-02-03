import type { IUploadedFile } from './uploaded-file.interface';
export interface IStorageService {
  upload(
    file: Buffer,
    filename: string,
    bucket?: string,
  ): Promise<IUploadedFile>;
}
