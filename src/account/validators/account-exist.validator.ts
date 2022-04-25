import { Injectable, Inject } from '@nestjs/common';
import { ValidatorConstraint, registerDecorator } from 'class-validator';
import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ACCOUNT_SERVICE } from '../account.constants';
import { IAccountService } from '../interfaces';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly accountService: IAccountService,
  ) {}

  /**
   * @param email
   * @param args
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(email: string, args: ValidationArguments): Promise<boolean> {
    return this.accountService
      .checkEmailExist(email)
      .then((account) => !account);
  }
}

/**
 * Is account already exist
 * @description Decorator for validating a new account before registration.
 * @param validationOptions
 *
 * Todo: add type for object param
 */
export function IsAccountAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
