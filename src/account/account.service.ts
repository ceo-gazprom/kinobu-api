import { Injectable, Inject, Logger } from '@nestjs/common';
import type { UpdateResult } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { hash, compare } from 'bcrypt';
import DeviceDectector from 'device-detector-js';
import type { DeviceDetectorResult } from 'device-detector-js';
import type {
  IAccountService,
  ICreateAccount,
  IAccountRepository,
} from './interfaces';
import { AccountEntity } from './entities';
import { ACCOUNT_REPOSITORY } from './account.constants';

@Injectable()
export class AccountService implements IAccountService {
  private readonly logger = new Logger(AccountService.name);
  /**
   * Device detector will parse any user agent and detect the browser,
   * operating system, device used.
   */
  // private readonly deviceDetector = new DeviceDectector();

  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository, //@InjectRepository(ReservedUsernameEntity) // private reservedUsernameRepository: Repository<ReservedUsernameEntity>, // @InjectRepository(WorstPasswordEntity) // private worstPasswordRepository: Repository<WorstPasswordEntity>,
  ) {}

  /**
   * Finds an account with the specified login in the database
   *
   * @param {String} login - can be email or phone number or username
   * @returns account entity or undefinded
   */
  public findAccountByLogin(login: string): Promise<AccountEntity | undefined> {
    return this.accountRepository.findByLogin(login);
  }

  /**
   * Verifies the password using the hash password from the database
   *
   * @param {String} password - incoming password
   * @param {String} hash - hash of the password from databse
   * @return boolean validation result
   */
  public validatePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  /**
   * We update the ip address when sign in complete
   *
   * @param {Number} - account id
   * @param {String} - the ip of the user who is logged in
   * @returns updated entity
   * Todo: добавить проверку подозрительного ip
   */
  public updateAccountIp(id: number, ip: string): Promise<UpdateResult> {
    return this.accountRepository.updateById(id, { ip });
  }

  /**
   * Check if such username is being used by another user
   * Todo: попробывать переписать проверки и сделать проверку данных за один запрос к БД
   */
  public async checkUsernameExist(username: string): Promise<boolean> {
    const result = await this.accountRepository.findOneByCondition({
      username,
    });

    return result ? true : false;
  }

  /**
   * Check if such email is being used by another user
   */
  public async checkEmailExist(email: string): Promise<boolean> {
    const result = await this.accountRepository.findOneByCondition({
      email,
    });
    return result ? true : false;
  }

  /**
   * Check if such phone number is being used by another user
   */
  public async checkPhoneNumberExist(phoneNumber: string): Promise<boolean> {
    const result = await this.accountRepository.findOneByCondition({
      phoneNumber,
    });
    return result ? true : false;
  }

  public async checkPasswordIsCorrect(
    accountId: number,
    password: string,
  ): Promise<boolean> {
    const account = await this.accountRepository.findOneById(accountId);
    return account?.password === password ? true : false;
  }

  // public checkPasswordValidate(password: string): Promise<string[]> {
  //   const reasons = [];
  //   // проверить в плохихи паролях
  //   // проверить устойчивость (ксть знак)
  // }

  /**
   *
   */
  @Transactional()
  public async createAccount(
    createAccountData: ICreateAccount,
  ): Promise<AccountEntity> {
    /**
     *
     */
    createAccountData.password = await hash(createAccountData.password, 8);
    return await this.accountRepository.create(createAccountData);
  }

  public async updatePassword(
    accountId: number,
    password: string,
  ): Promise<UpdateResult> {
    return this.accountRepository.updateById(accountId, { password });
  }

  public async setCurrentRefreshToken(refreshToken: string, accountId: number) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);

    // await this.accountRepository.

    // update(accountId, {
    //   currentHashedRefreshToken,
    // });
  }

  // private pasreUserAgent(userAgent: string): DeviceDetectorResult {
  //   return this.deviceDetector.parse(userAgent);
  // }
}
