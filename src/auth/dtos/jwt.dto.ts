import { ApiProperty } from '@nestjs/swagger';
import type { IJwtDto } from '../interfaces';

export class JwtDto implements IJwtDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI...',
  })
  access_token: string;

  constructor(item: IJwtDto) {
    this.access_token = item.access_token;
  }
}
