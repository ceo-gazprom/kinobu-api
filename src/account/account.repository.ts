import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { AbstractRepository } from '../common';
import { AccountEntity } from './entities';
import { IAccountRepository, ICreateAccount } from './interfaces';

@Injectable()
export class AccountRepository
  extends AbstractRepository<AccountEntity>
  implements IAccountRepository
{
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {
    super(accountRepository);
  }

  /**
   *
   */
  public createAccount(createAccount: ICreateAccount): Promise<AccountEntity> {
    return this.create(createAccount);
  }

  /**
   * The login can be email phone number or username
   */
  public findByLogin(login: string): Promise<AccountEntity | undefined> {
    return this.queryBuilder('account')
      .where(
        'account.phone_number = :phoneNumber AND account.phone_number IS NOT NULL',
        {
          phoneNumber: login,
        },
      )
      .orWhere('account.email = :email', { email: login })
      .orWhere('account.username = :username', { username: login })
      .getOne();
  }
}
