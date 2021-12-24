import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundExceptionFilter extends HttpException {
  constructor(userId: number) {
    super(
      `User with the specified id - ${userId} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }
}
