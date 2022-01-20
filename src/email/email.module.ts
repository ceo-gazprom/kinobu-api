import { Module } from '@nestjs/common';
import { EMAIL_PROVIDER } from './email.constants';
import { EmailProvider } from './email.provider';

@Module({
  providers: [
    {
      provide: EMAIL_PROVIDER,
      useClass: EmailProvider,
    },
  ],
})
export class EmailModule {}
