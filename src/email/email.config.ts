import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_SERVICE, IConfigService } from '../config';
import { IEmailConfig } from './interfaces';

@Injectable()
export class EmailConfig implements IEmailConfig {
  constructor(
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigService,
  ) {}

  public get emailHost(): string {
    return this.configService.getString('EMAIL_HOST');
  }

  public get emailPort(): number | undefined {
    return this.configService.getOptionalNumber('EMAIL_PORT');
  }

  public get emailAuthUser(): string {
    return this.configService.getString('EMAIL_AUTH_USER');
  }
  public get emailAuthPassword(): string {
    return this.configService.getString('EMAIL_AUTH_PASSWORD');
  }
}
