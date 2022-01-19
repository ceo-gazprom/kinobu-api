import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { LOGGER_SERVICE } from './logger.constants';
import { LoggerService } from './logger.service';

const providers: Provider[] = [
  {
    provide: LOGGER_SERVICE,
    useClass: LoggerService,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class LoggerModule {}
