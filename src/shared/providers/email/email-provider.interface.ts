import type * as Mail from 'nodemailer/lib/mailer';

// Todo: сделать интерфейс кастомный, не использовать тип из библиотеки
export interface IEmailProvider {
  sendMail(options: Mail.Options): Promise<any>;
}
