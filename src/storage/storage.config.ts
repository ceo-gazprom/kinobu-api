import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_SERVICE } from '../config';
import type { IConfigService } from '../config';
import { IStorageConfig } from './interfaces';

@Injectable()
export class StorageConfig implements IStorageConfig {
  constructor(
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigService,
  ) {}

  public get s3Endpoint(): string {
    let endpoint = this.s3Host;
    /**
     * If port for address s3 was specified
     */
    if (this.s3Port) endpoint += ':' + this.s3Port;

    return endpoint;
  }

  public get s3AccessKey(): string {
    return this.configService.getString('S3_ACCESS_KEY');
  }

  public get s3SecretKey(): string {
    return this.configService.getString('S3_SECRET_KEY');
  }

  public get s3PublicBucketName(): string {
    return this.configService.getString('S3_PUBLIC_BUCKET_NAME');
  }

  private get s3Host(): string {
    return this.configService.getString('S3_HOST');
  }

  private get s3Port(): number | undefined {
    return this.configService.getOptionalNumber('S3_PORT');
  }
}
