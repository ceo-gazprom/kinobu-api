import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { ConfigModule } from '../config';
import { EMAIL_CONFIG, EMAIL_SERVICE } from './email.constants';
import { EmailConfig } from './email.config';
import { EmailProvider } from './email.service';

const internalProviders: Provider[] = [
  {
    provide: EMAIL_CONFIG,
    useClass: EmailConfig,
  },
];

const externalProviders: Provider[] = [
  {
    provide: EMAIL_SERVICE,
    useClass: EmailProvider,
  },
];
@Module({
  imports: [ConfigModule],
  providers: [...internalProviders, ...externalProviders],
  exports: [...externalProviders],
})
export class EmailModule {}
