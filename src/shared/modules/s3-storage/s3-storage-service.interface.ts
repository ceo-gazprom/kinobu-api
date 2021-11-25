import { IUploadedFile } from '../../../interfaces';

export interface IS3StorageService {
  upload(file: IUploadedFile): Promise<void>;
}
