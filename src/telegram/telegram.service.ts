import { Injectable, Inject } from '@nestjs/common';
import { TELEGRAM_CONFIG } from './telegram.constants';
import type { ITelegramConfig, ITelegramService } from './interfaces';

@Injectable()
export class TelegramService implements ITelegramService {
  constructor(
    @Inject(TELEGRAM_CONFIG) private readonly telegramConfig: ITelegramConfig,
  ) {}
}
