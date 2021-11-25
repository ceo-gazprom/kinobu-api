import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IAccountService } from './account-service.interface';
import { AccountRepository } from './account.repository';
import { EMAIL_PROVIDER, IEmailProvider } from '../../shared/providers/email';
import { ReservedUsernameEntity, WorstPasswordEntity } from './entities';
import { AccountEntity } from './entities';
import type { CreateAccountDto, LoginAccountDto } from './dto';
import { ICreateAccount, IJwtData } from './interfaces';

@Injectable()
export class AccountService implements IAccountService {
  private readonly logger = new Logger(AccountService.name);
  constructor(
    @Inject(EMAIL_PROVIDER) private readonly emailProvider: IEmailProvider,
    @InjectRepository(AccountRepository)
    private readonly accountRepository: AccountRepository,
    @InjectRepository(ReservedUsernameEntity)
    private reservedUsernameRepository: Repository<ReservedUsernameEntity>,
    @InjectRepository(WorstPasswordEntity)
    private worstPasswordRepository: Repository<WorstPasswordEntity>,
    private jwtService: JwtService,
  ) {}

  /**
   *
   */
  public async login(
    loginAccountDto: LoginAccountDto,
    ip: string,
  ): Promise<IJwtData> {
    const { login, password } = loginAccountDto;

    const accaunt = await this.getAccountByLogin(login);
    const { id } = accaunt;

    const validate = await this.validatePassword(password, accaunt.password);
    this.logger.debug(validate);
    if (!validate)
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);

    /**
     * We update the ip address when sign in complete
     * Todo: добавить проверку подозрительного ip
     */
    this.accountRepository.update({ id }, { ip });

    const payload = { userId: id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Check if such username is being used by another user
   * Todo: попробывать переписать проверки и сделать проверку данных за один запрос к БД
   */
  public async checkUsernameExist(username: string): Promise<boolean> {
    const result = await this.accountRepository.findOne({
      where: {
        username,
      },
    });
    return result ? true : false;
  }

  /**
   * Check if such email is being used by another user
   */
  public async checkEmailExist(email: string): Promise<boolean> {
    const result = await this.accountRepository.findOne({
      where: {
        email,
      },
    });
    return result ? true : false;
  }

  /**
   * Check if such phone number is being used by another user
   */
  public async checkPhoneNumberExist(phoneNumber: string): Promise<boolean> {
    const result = await this.accountRepository.findOne({
      where: {
        phoneNumber,
      },
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

  // public checkPasswordValidate(password: string): Promise<string[]> {
  //   const reasons = [];
  //   // проверить в плохихи паролях
  //   // проверить устойчивость (ксть знак)
  // }

  /**
   *
   */
  public createAccount(
    createAccountData: ICreateAccount,
  ): Promise<AccountEntity> {
    return this.accountRepository.createAccount(createAccountData);
  }

  /**
   * The login can be email phone number or username
   */
  private async getAccountByLogin(login: string): Promise<AccountEntity> {
    return this.accountRepository.findByLogin(login);
  }

  /**
   * Verifies the sent password with the password from the database
   */
  private validatePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
