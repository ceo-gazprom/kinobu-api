import { Injectable, Logger } from '@nestjs/common';
import type { ILoggerService } from './interfaces';

@Injectable()
export class LoggerService extends Logger implements ILoggerService {}
