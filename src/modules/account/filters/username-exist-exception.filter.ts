import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameExistExceptionFilter extends HttpException {
  constructor() {
    super('This username is already in use', HttpStatus.BAD_REQUEST);
  }
}
