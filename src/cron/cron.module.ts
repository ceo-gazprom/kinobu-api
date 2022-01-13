import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DiactivatedConfirmCodesJob } from './jobs';

@Module({
  imports: [ScheduleModule],
})
export class CronModule {}
