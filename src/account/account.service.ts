import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository, UpdateResult } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { hash, compare } from 'bcrypt';
import type {
  IAccountService,
  ICreateAccount,
  IAccountRepository,
  IJwtData,
  IEmailConfirmCodeRepository,
} from './interfaces';
import { EMAIL_SERVICE } from '../email';
import type { IEmailService } from '../email';
import {
  ReservedUsernameEntity,
  WorstPasswordEntity,
  AccountEntity,
} from './entities';
import type { CreateAccountDto, LoginAccountDto } from './dto';
import {
  ACCOUNT_REPOSITORY,
  EMAIL_CONFIRM_CODE_REPOSITORY,
} from './account.constants';
import { JWT_SERVICE, IJwtService } from '../jwt';
@Injectable()
export class AccountService implements IAccountService {
  private readonly logger = new Logger(AccountService.name);
  constructor(
    @Inject(EMAIL_SERVICE) private readonly emailService: IEmailService,
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
    @Inject(EMAIL_CONFIRM_CODE_REPOSITORY)
    private readonly emailConfirmCodeRepository: IEmailConfirmCodeRepository,
    @InjectRepository(ReservedUsernameEntity)
    private reservedUsernameRepository: Repository<ReservedUsernameEntity>,
    @InjectRepository(WorstPasswordEntity)
    private worstPasswordRepository: Repository<WorstPasswordEntity>,
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
   *
   * @param {Number} id - account id
   * @returns jwt token
   */
  public generateJwtToken(accountId: number): IJwtData {
    const accessToken = this.jwtService.getAccessToken(accountId);
    return {
      access_token: accessToken,
    };
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

  /**
   * Check if the password matches other account data
   */
  public checkPasswordMatchAccountData(
    createAccountDto: CreateAccountDto,
  ): boolean {
    const { password, ...accountData } = createAccountDto;
    const accountValues = Object.values(accountData);
    return accountValues.includes(password);
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
    const account = await this.accountRepository.create(createAccountData);

    /**
     *
     */
    const confirmCode = this.generateConfirmCode();
    await this.emailConfirmCodeRepository.create({
      email: createAccountData.email,
      code: confirmCode,
    });

    this.emailService.sendConfirmCode(createAccountData.email, confirmCode);

    return account;
  }

  public async updatePassword(
    accountId: number,
    password: string,
  ): Promise<UpdateResult> {
    return this.accountRepository.updateById(accountId, { password });
  }

  private generateConfirmCode(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
