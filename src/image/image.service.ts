import { Injectable } from '@nestjs/common';
import type { IImageService } from './interfaces';
import { allowImageMimeTypes } from './image.constants';

@Injectable()
export class ImageService implements IImageService {
  public validateMimeType(mimeType: string): boolean {
    if (allowImageMimeTypes.includes(mimeType)) return true;
    return false;
  }
}
