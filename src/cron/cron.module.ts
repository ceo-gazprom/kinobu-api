import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DiactivatedConfirmCodesJob } from './jobs';

const jobs: Provider[] = [
  // DiactivatedConfirmCodesJob
];
@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [...jobs],
})
export class CronModule {}
