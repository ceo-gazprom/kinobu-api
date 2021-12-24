import { Controller, Inject, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';
import { HealthCheckResult } from '@nestjs/terminus';
import {
  HEALTH_CHECKER_SERVICE,
  DISK_HEALTH_INDICATOR,
  MEMORY_HEALTH_INDICATOR,
  TYPEORM_HEALTH_INDICATOR,
} from './health.constants';
import type {
  HealthCheckService,
  DiskHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller({
  version: '1',
  path: 'health',
})
@ApiTags('HEALTH')
export class HealthController {
  constructor(
    @Inject(HEALTH_CHECKER_SERVICE)
    private readonly healthService: HealthCheckService,
    @Inject(DISK_HEALTH_INDICATOR)
    private readonly diskHealthIndicator: DiskHealthIndicator,
    @Inject(TYPEORM_HEALTH_INDICATOR)
    private readonly typeormHealthIndicator: TypeOrmHealthIndicator,
    @Inject(MEMORY_HEALTH_INDICATOR)
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.healthService.check([
      () => this.typeormHealthIndicator.pingCheck('database'),

      /** The process should not use more than 300MB memory */
      () =>
        this.memoryHealthIndicator.checkHeap('memory heap', 300 * 1024 * 1024),

      /** The process should not have more than 300MB RSS memory allocated */
      () =>
        this.memoryHealthIndicator.checkRSS('memory RSS', 300 * 1024 * 1024),

      /** The used disk storage should not exceed the 50% of the available space */
      () =>
        this.diskHealthIndicator.checkStorage('disk health', {
          thresholdPercent: 0.5,
          path: '/',
        }),
    ]);
  }
}
