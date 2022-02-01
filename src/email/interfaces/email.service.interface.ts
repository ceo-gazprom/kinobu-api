import type { Options } from 'nodemailer/lib/mailer';

export interface IEmailService {
  sendMail(options: Options): Promise<any>;
}
