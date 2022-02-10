import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { ConfigModule } from '../config';
import { TELEGRAM_CONFIG, TELEGRAM_SERVICE } from './telegram.constants';
import { TelegramConfig } from './telegram.config';
import { TelegramService } from './telegram.service';

const internalProviders: Provider[] = [
  {
    provide: TELEGRAM_CONFIG,
    useClass: TelegramConfig,
  },
];

const externalProviders: Provider[] = [
  {
    provide: TELEGRAM_SERVICE,
    useClass: TelegramService,
  },
];

@Module({
  imports: [ConfigModule],
  providers: [...internalProviders, ...externalProviders],
  exports: [...externalProviders],
})
export class TelegramModule {}
