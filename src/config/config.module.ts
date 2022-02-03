import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { CONFIG_SERVICE } from './config.constants';
import { ConfigService } from './config.service';

const providers: Provider[] = [
  {
    provide: CONFIG_SERVICE,
    useClass: ConfigService,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class ConfigModule {}
