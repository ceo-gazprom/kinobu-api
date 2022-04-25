import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountNotFoundException extends HttpException {
  constructor() {
    super('Account with this login was not found', HttpStatus.NOT_FOUND);
  }
}
