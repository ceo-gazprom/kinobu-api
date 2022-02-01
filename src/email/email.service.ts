import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import type * as Mail from 'nodemailer/lib/mailer';
import { IEmailService } from './interfaces/email.service.interface';

@Injectable()
export class EmailProvider implements IEmailService {
  private nodemailerTransport: Mail;

  constructor() {
    this.nodemailerTransport = createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Todo: Добавить возвращаемый тип
  public sendMail(options: Mail.Options): Promise<any> {
    return this.nodemailerTransport.sendMail(options);
  }
}
