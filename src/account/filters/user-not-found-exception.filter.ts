import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundExceptionFilter extends HttpException {
  constructor() {
    super('User with this login was not found', HttpStatus.NOT_FOUND);
  }
}
