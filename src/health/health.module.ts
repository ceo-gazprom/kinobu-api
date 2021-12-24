import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import {
  TerminusModule,
  HealthCheckService,
  DiskHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import {
  HEALTH_CHECKER_SERVICE,
  DISK_HEALTH_INDICATOR,
  MEMORY_HEALTH_INDICATOR,
  TYPEORM_HEALTH_INDICATOR,
} from './health.constants';
import { HealthController } from './health.controller';

const providers: Provider[] = [
  {
    provide: HEALTH_CHECKER_SERVICE,
    useClass: HealthCheckService,
  },

  /** Injection indicators */
  {
    provide: DISK_HEALTH_INDICATOR,
    useClass: DiskHealthIndicator,
  },
  {
    provide: MEMORY_HEALTH_INDICATOR,
    useClass: MemoryHealthIndicator,
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
