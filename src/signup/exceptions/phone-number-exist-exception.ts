import { HttpException, HttpStatus } from '@nestjs/common';

export class PhoneNumberExistException extends HttpException {
  constructor() {
    super('This phone number is already in use', HttpStatus.BAD_REQUEST);
  }
}
