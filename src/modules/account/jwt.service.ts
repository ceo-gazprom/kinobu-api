import { Injectable } from '@nestjs/common';
import { IJwtService } from './interfaces';

@Injectable()
export class JwtService implements IJwtService {}
