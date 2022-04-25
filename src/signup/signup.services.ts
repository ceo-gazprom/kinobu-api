import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { ACCOUNT_SERVICE, IAccountService } from '../account';
import { EMAIL_SERVICE, IEmailService } from '../email';
import type {
  ISignupService,
  ICreateAccountDto,
  IEmailConfirmCodeEntity,
} from './interfaces';
import { EmailConfirmCodeEntity } from './entities';

@Injectable()
export class SignupService implements ISignupService {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly accountService: IAccountService,
    @Inject(EMAIL_SERVICE) private readonly emailService: IEmailService,
    @InjectRepository(EmailConfirmCodeEntity)
    private readonly emailConfirmCodeRepository: Repository<IEmailConfirmCodeEntity>,
  ) {}

  public async registration(createAccountDto: ICreateAccountDto) {
    const account = await this.accountService.createAccount(createAccountDto);
    /**
     *
     */
    const confirmCode = this.generateConfirmCode();
    await this.emailConfirmCodeRepository.create({
      email: createAccountDto.email,
      code: confirmCode,
    });

    this.emailService.sendConfirmCode(createAccountDto.email, confirmCode);

    return account;
  }

  /**
   * Check if the password matches other account data
   */
  public checkPasswordMatchAccountData(
    createAccountDto: ICreateAccountDto,
  ): boolean {
    const { password, ...accountData } = createAccountDto;
    const accountValues = Object.values(accountData);
    return accountValues.includes(password);
  }

  /**
   * Generates a six-digit code to send confirmation
   */
  private generateConfirmCode(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
