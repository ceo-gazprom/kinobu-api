import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordSameDataException extends HttpException {
  constructor() {
    super(
      'The password is the same as other account details',
      HttpStatus.BAD_REQUEST,
    );
  }
}
