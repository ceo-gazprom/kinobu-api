import { Injectable } from '@nestjs/common';
import type { IImageService } from './interfaces';

@Injectable()
export class ImageService implements IImageService {
  public checkMimeAllowed(): boolean {}
}
