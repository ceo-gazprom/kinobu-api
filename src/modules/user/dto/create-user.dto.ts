import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'example@example.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'example',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '123password',
  })
  password: string;
}
