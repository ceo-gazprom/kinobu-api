import { IUploadedFile } from '../../common/interfaces';

export interface IStorageService {
  upload(file: IUploadedFile): Promise<void>;
}
