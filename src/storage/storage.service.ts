import { Injectable, Inject, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import type { PutObjectRequest } from 'aws-sdk/clients/s3';
import type { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { v4 as uuid } from 'uuid';
import { STORAGE_CONFIG } from './storage.constants';
import type {
  IStorageService,
  IStorageConfig,
  IUploadedFile,
} from './interfaces';

@Injectable()
export class StorageService implements IStorageService {
  /**
   *
   */
  private readonly logger = new Logger(StorageService.name);

  /**
   *
   */
  private s3ClientInstance: S3;

  /**
   *
   */
  private readonly defaultPublicBucketName =
    this.storageConfig.s3PublicBucketName;

  constructor(
    @Inject(STORAGE_CONFIG) private readonly storageConfig: IStorageConfig,
  ) {}

  /**
   *
   */
  private get s3Client(): S3 {
    if (!this.s3ClientInstance) {
      const options: ServiceConfigurationOptions = {
        accessKeyId: this.storageConfig.s3AccessKey,
        secretAccessKey: this.storageConfig.s3SecretKey,
        endpoint: this.storageConfig.s3Endpoint,
      };

      this.s3ClientInstance = new S3(options);
    }
    return this.s3ClientInstance;
  }

  /**
   *
   * @param file
   * @param filename
   * @param bucket
   * @returns
   */
  public async upload(
    file: Buffer,
    filename: string,
    bucket?: string,
  ): Promise<IUploadedFile> {
    const bucketS3 = bucket ? bucket : this.defaultPublicBucketName;
    const key = `${uuid()}-${filename}`;

    const params: PutObjectRequest = {
      Bucket: bucketS3,
      Key: key,
      Body: file,
    };

    await this.s3Client.upload(params).promise();

    return {
      host: `${this.storageConfig.s3Endpoint}/${bucket}`,
      filename: key,
    };
  }
}
