import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_SERVICE } from '../config';
import type { IConfigService } from '../config';
import type { ITelegramConfig } from './interfaces';

@Injectable()
export class TelegramConfig implements ITelegramConfig {
  constructor(
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigService,
  ) {}

  public get telegramBotToken(): string {
    return this.configService.getString('TELEGRAM_BOT_TOKEN');
  }
}
