import { Controller, Inject, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';
import { HealthCheckResult } from '@nestjs/terminus';
import {
  HEALTH_CHECKER_SERVICE,
  TYPEORM_HEALTH_INDICATOR,
} from './di.constants';
import type {
  HealthCheckService,
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
    @Inject(TYPEORM_HEALTH_INDICATOR)
    private readonly typeormHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.healthService.check([
      () => this.typeormHealthIndicator.pingCheck('database'),
    ]);
  }
}
