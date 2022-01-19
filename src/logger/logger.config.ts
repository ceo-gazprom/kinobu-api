import { Injectable, Inject } from '@nestjs/common';
import type { LogLevel } from '@nestjs/common';
import { CONFIG_SERVICE, IConfigService } from '../config';
import type { ILoggerConfig } from './interfaces';

@Injectable()
export class LoggerConfig implements ILoggerConfig {
  constructor(
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigService,
  ) {}

  public get logLevels(): LogLevel[] {
    if (this.configService.isProduction) {
      return ['log', 'warn', 'error'];
    }

    return ['error', 'warn', 'log', 'verbose', 'debug'];
  }
}
