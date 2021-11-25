import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { IS3StorageService } from './s3-storage-service.interface';
import { IUploadedFile } from '../../../interfaces';
import { s3StorageConfig } from '../../../configs';

@Injectable()
export class S3StorageService implements IS3StorageService {
  private readonly logger = new Logger(S3StorageService.name);
  private s3: S3;

  private getS3(): S3 {
    if (!this.s3) this.s3 = new S3(s3StorageConfig);
    return this.s3;
  }

  public async upload(file: IUploadedFile, bucket?: string): Promise<void> {
    const bucketS3 = bucket ? bucket : process.env.S3_DEFAULT_BUCKET;
    return await this.uploadS3(file.buffer, file.originalname, bucketS3);
  }

  private uploadS3(file: Buffer | string, name: string, bucket?: string): void {
    const s3 = this.getS3();

    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };

    // return new Promise((resolve, reject) => {
    //   s3.upload(params, (err, data) => {
    //     if (err) {
    //       Logger.error(err);
    //       reject(err.message);
    //     }
    //     resolve(data);
    //   });
    // });
  }
}
