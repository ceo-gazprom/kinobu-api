import { ApiProperty } from '@nestjs/swagger';
import type { UserEntity } from '../entities/user.entity';

export class UserDto {
  @ApiProperty({
    example: '7',
  })
  id: number;

  @ApiProperty({
    example: 'example',
  })
  username: string;

  static fromEntity(userEntity: UserEntity): UserDto {
    const user = new UserDto();
    user.username = userEntity.username;

    return user;
  }
}
