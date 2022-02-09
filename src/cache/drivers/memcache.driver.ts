import { Injectable } from '@nestjs/common';
import type { ICacheDriver } from '../interfaces';

@Injectable()
export class MemcacheDriver implements ICacheDriver {}
