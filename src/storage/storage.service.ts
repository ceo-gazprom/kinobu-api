import { Injectable, Inject, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import type { PutObjectRequest } from 'aws-sdk/clients/s3';
import type { ConfigurationOptions } from 'aws-sdk/global';
import { v4 as uuid } from 'uuid';
import { STORAGE_CONFIG } from './storage.constants';
import type { IStorageService, IStorageConfig } from './interfaces';

@Injectable()
export class StorageService implements IStorageService {
  private readonly logger = new Logger(StorageService.name);
  private s3: S3;

  constructor(
    @Inject(STORAGE_CONFIG) private readonly storageConfig: IStorageConfig,
  ) {}

  private getS3(): S3 {
    if (!this.s3) {
      const options: ConfigurationOptions = {
        accessKeyId: this.storageConfig.s3AccessKey,
        secretAccessKey: this.storageConfig.s3SecretKey,
      };

      this.s3 = new S3(options);
    }
    return this.s3;
  }

  public async uploadFile(
    file: Buffer,
    filename?: string,
    bucket?: string,
  ): Promise<void> {
    const bucketS3 = bucket ? bucket : process.env.S3_DEFAULT_BUCKET;
    const instanseS3 = this.getS3();
    const key = filename ? filename : this.generateName();

    const params: PutObjectRequest = {
      Bucket: bucketS3,
      Key: key,
      Body: file,
    };

    return new Promise((resolve, reject) => {
      instanseS3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  /**
   *
   * @returns
   */
  private generateName(): string {
    return uuid();
  }
}
