import { Repository, EntityRepository } from 'typeorm';
import { AccountEntity } from './entities';
import { ICreateAccount } from './interfaces';

@EntityRepository(AccountEntity)
export class AccountRepository extends Repository<AccountEntity> {
  /**
   *
   */
  public createAccount(createAccount: ICreateAccount): Promise<AccountEntity> {
    const account = AccountEntity.create(createAccount);
    return this.save(account);
  }

  /**
   * The login can be email phone number or username
   */
  public findByLogin(login: string): Promise<AccountEntity> {
    return this.createQueryBuilder('account')
      .where(
        'account.phone_number = :phoneNumber AND account.phone_number IS NOT NULL',
        {
          phoneNumber: login,
        },
      )
      .orWhere('account.email = :email', { email: login })
      .orWhere('account.username = :username', { username: login })
      .getOneOrFail();
  }
}
