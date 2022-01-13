import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DiactivatedConfirmCodesJob {
  private readonly logger = new Logger(DiactivatedConfirmCodesJob.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  runEvery10Seconds() {
    this.logger.log('Cron start');
  }
}
