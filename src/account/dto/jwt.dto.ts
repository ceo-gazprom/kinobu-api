import { ApiProperty } from '@nestjs/swagger';
import type { IJwtData } from '../../jwt';

export class JwtDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI...',
  })
  access_token: string;

  static fromItem(item: IJwtData): JwtDto {
    const jwt = new JwtDto();
    jwt.access_token = item.access_token;
    return jwt;
  }
}
