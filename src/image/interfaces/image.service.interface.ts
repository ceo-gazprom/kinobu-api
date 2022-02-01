import type { IBufferedFile } from '../../common/interfaces';
export interface IImageService {
  validateMimeType(mimeType: string): boolean;
  validateImageSize(imageSize: number): boolean;
  uploadImage(image: Buffer): Promise<string>;
}
