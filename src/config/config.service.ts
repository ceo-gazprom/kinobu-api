import { Injectable, Logger } from '@nestjs/common';
import { IConfigService } from './interfaces';

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
  public getString(key: string): string {
    const value = this.getEnvironmentVariable(key);

    return value.replace(/\\n/g, '\n');
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

  /**
   *
   * @param key
   * @returns
   */
  public getOptionalNumber(key: string): number | undefined {
    const value = this.getOptionalEnvironmentVariable(key);

    if (value) {
      try {
        return Number(value);
      } catch {
        this.logger.error(key + ' environment variable is not a number');
        process.exit(1);
      }
    }

    return undefined;
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
  private getEnvironmentVariable(key: string): string {
    const envVar = process.env[key];
    if (!envVar) {
      this.logger.error(key + ' environment variable does not exist');
      process.exit(1);
    }
    return <string>envVar;
  }

  /**
   *
   * @param key
   * @returns
   */
  private getOptionalEnvironmentVariable(key: string): string | undefined {
    const envVar = process.env[key];
    if (!envVar) return undefined;
    return <string>envVar;
  }
}
