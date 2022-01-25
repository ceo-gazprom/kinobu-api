import { HttpException, HttpStatus } from '@nestjs/common';
import { allowImageMimeTypes } from '../image.constants';

export class ForbiddenMimeTypeFilter extends HttpException {
  constructor() {
    super(
      'Image mime type must be one of ' + allowImageMimeTypes.join(', '),
      HttpStatus.BAD_REQUEST,
    );
  }
}
