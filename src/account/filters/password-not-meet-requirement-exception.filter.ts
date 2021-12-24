import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordNotMeetRequirementExceptionFilter extends HttpException {
  constructor(reasons: string[]) {
    super(
      `Password does not meet the requirement: ${reasons}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
