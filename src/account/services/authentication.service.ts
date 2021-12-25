import { Injectable, Inject } from '@nestjs/common';
import { IAuthenticationService, IAccountRepository } from '../interfaces';
import { ACCOUNT_REPOSITORY } from '../account.constants';

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
  ) {}
}
