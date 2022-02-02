import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_SERVICE } from '../config';
import type { IConfigService } from '../config';
import { IStorageConfig } from './interfaces';

@Injectable()
export class StorageConfig implements IStorageConfig {
  constructor(
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigService,
  ) {}

  public get s3AccessKey(): string {
    return this.configService.getString('S3_ACCESS_KEY');
  }

  public get s3SecretKey(): string {
    return this.configService.getString('S3_SECRET_KEY');
  }
}
