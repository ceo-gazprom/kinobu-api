import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_SERVICE, IConfigService } from '../config';
import { IEmailConfig } from './interfaces';

@Injectable()
export class EmailConfig implements IEmailConfig {
  constructor(
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigService,
  ) {}

  public get emailService(): string {
    return this.configService.getString('EMAIL_SERVICE');
  }

  public get emailAuthUser(): string {
    return this.configService.getString('EMAIL_AUTH_USER');
  }
  public get emailAuthPassword(): string {
    return this.configService.getString('EMAIL_AUTH_PASSWORD');
  }
}
