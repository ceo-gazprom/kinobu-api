import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectPasswordExceptionFilter extends HttpException {
  constructor() {
    super('Incorrect password', HttpStatus.UNAUTHORIZED);
  }
}
