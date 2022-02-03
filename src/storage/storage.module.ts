import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { ConfigModule } from '../config';
import { STORAGE_CONFIG, STORAGE_SERVICE } from './storage.constants';
import { StorageConfig } from './storage.config';
import { StorageService } from './storage.service';

const internalProviders: Provider[] = [
  {
    provide: STORAGE_CONFIG,
    useClass: StorageConfig,
  },
];
const externalProviders: Provider[] = [
  { provide: STORAGE_SERVICE, useClass: StorageService },
];

@Module({
  imports: [ConfigModule],
  providers: [...internalProviders, ...externalProviders],
  exports: [...externalProviders],
})
export class StorageModule {}
