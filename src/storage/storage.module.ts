import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { STORAGE_SERVICE } from './storage.constants';
import { StorageService } from './storage.service';

const providers: Provider[] = [
  { provide: STORAGE_SERVICE, useClass: StorageService },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class StorageModule {}
