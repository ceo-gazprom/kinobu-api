import { Injectable, Inject } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import type * as Mail from 'nodemailer/lib/mailer';
import { EMAIL_CONFIG } from './email.constants';
import { IEmailService, IEmailConfig } from './interfaces';

@Injectable()
export class EmailProvider implements IEmailService {
  private nodemailerTransport: Mail;

  constructor(
    @Inject(EMAIL_CONFIG) private readonly emailConfig: IEmailConfig,
  ) {
    this.nodemailerTransport = createTransport({
      host: this.emailConfig.emailHost,
      port: this.emailConfig.emailPort,
      // auth: {
      //   user: this.emailConfig.emailAuthUser,
      //   pass: this.emailConfig.emailAuthPassword,
      // },
    });
  }

  // Todo: Добавить возвращаемый тип
  public sendMail(options: Mail.Options): Promise<any> {
    return this.nodemailerTransport.sendMail(options);
  }
}
