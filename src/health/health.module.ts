import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import {
  TerminusModule,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import {
  HEALTH_CHECKER_SERVICE,
  TYPEORM_HEALTH_INDICATOR,
} from './di.constants';
import { HealthController } from './health.controller';

const providers: Provider[] = [
  {
    provide: HEALTH_CHECKER_SERVICE,
    useClass: HealthCheckService,
  },
  {
    provide: TYPEORM_HEALTH_INDICATOR,
    useClass: TypeOrmHealthIndicator,
  },
];

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [...providers],
})
export class HealthModule {}
