import type { LogLevel } from '@nestjs/common';
export interface ILoggerConfig {
  logLevels: LogLevel[];
}
