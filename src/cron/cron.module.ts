import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule],
})
export class CronModule {}
