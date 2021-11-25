import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { S3_STORAGE_SERVICE } from './di.constant';
import { S3StorageService } from './s3-storage.service';

const providers: Provider[] = [
  {
    useClass: S3StorageService,
    provide: S3_STORAGE_SERVICE,
  },
];

@Module({
  providers: [...providers],
})
export class S3StorageModule {}
