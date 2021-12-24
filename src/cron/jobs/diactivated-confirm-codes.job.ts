import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DiactivatedConfirmCodesJob {
  private readonly logger = new Logger(DiactivatedConfirmCodesJob.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  runEvery10Seconds() {
    this.logger.log('Cron start');
  }
}
