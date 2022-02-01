import { Injectable, Inject } from '@nestjs/common';
import sharp from 'sharp';
import type { IImageService } from './interfaces';
import { STORAGE_SERVICE, IStorageService } from '../storage';
import { allowImageMimeTypes, maxImageSize } from './image.constants';
import type { IBufferedFile } from '../common/interfaces';

@Injectable()
export class ImageService implements IImageService {
  constructor(
    @Inject(STORAGE_SERVICE) private readonly storageService: IStorageService,
  ) {}

  /**
   *
   * @param mimeType
   * @returns
   */
  public validateMimeType(mimeType: string): boolean {
    if (allowImageMimeTypes.includes(mimeType)) return true;
    return false;
  }

  /**
   *
   * @param imageSize
   */
  public validateImageSize(imageSize: number): boolean {
    /**
     * Converting the size of the uploaded image from bytes to megabytes
     */
    const size = imageSize / Math.pow(1024, 2);
    console.log('size ->>>', size);

    if (size < maxImageSize) return true;
    return false;
  }

  /**
   *
   * @param file
   */
  public uploadImage(image: Buffer): Promise<string> {
    return this.storageService.upload(image);
  }

  /**
   *
   */
  private compressImage(image: Buffer, quality: number): Promise<Buffer> {
    return sharp(image)
      .jpeg({
        quality,
      })
      .toBuffer();
  }
}
