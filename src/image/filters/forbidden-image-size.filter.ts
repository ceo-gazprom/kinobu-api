import { HttpException, HttpStatus } from '@nestjs/common';
import { maxImageSize } from '../image.constants';

export class ForbiddenImageSizeFilter extends HttpException {
  constructor() {
    super(`Image must be less than ${maxImageSize} mb`, HttpStatus.BAD_REQUEST);
  }
}
