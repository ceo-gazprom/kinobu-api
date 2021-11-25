import { Injectable } from '@nestjs/common';
import { ICacheManagerService } from './cache-manager-service.interface';

@Injectable()
export class CacheManagerService implements ICacheManagerService {}
