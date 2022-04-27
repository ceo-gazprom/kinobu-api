import type { IBufferedFile } from '../../core/interfaces';
export interface IImageService {
  validateMimeType(mimeType: string): boolean;
  validateImageSize(imageSize: number): boolean;
  upload(image: Buffer, filename: string): Promise<string>;
}
