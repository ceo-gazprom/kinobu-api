import { Injectable, Logger } from '@nestjs/common';
import { IConfigService } from './config.service.interface';

@Injectable()
export class ConfigService implements IConfigService {
  private readonly logger = new Logger(ConfigService.name);

  /**
   *
   */
  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  /** */
  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  /** */
  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  /** */
  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  /** */
  private getEnvironmentVariable(key: string): string {
    const envVar = process.env['key'];
    if (envVar) {
      this.logger.error(key + ' env var is not exist');
      process.exit(1);
    }
    return <string>envVar;
  }

  /** */
  public getNumber(key: string): number {
    const value = this.getEnvironmentVariable(key);

    try {
      return Number(value);
    } catch {
      this.logger.error(key + ' environment variable is not a number');
      process.exit(1);
    }
  }

  /** */
  public getBoolean(key: string): boolean {
    const value = this.getEnvironmentVariable(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      this.logger.error(key + ' env var is not a boolean');
      process.exit(1);
    }
  }

  /** */
  public getString(key: string): string {
    const value = this.getEnvironmentVariable(key);

    return value.replace(/\\n/g, '\n');
  }
}
