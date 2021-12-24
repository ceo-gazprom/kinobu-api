import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { STORAGE_SERVICE } from './di.constant';
import { S3StorageService } from './s3';

const providers: Provider[] = [
  {
    useClass: S3StorageService,
    provide: STORAGE_SERVICE,
  },
];

@Module({
  providers: [...providers],
})
export class StorageModule {}
