import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { EMAIL_SERVICE } from './email.constants';
import { EmailProvider } from './email.service';

const providers: Provider[] = [
  {
    provide: EMAIL_SERVICE,
    useClass: EmailProvider,
  },
];
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class EmailModule {}
