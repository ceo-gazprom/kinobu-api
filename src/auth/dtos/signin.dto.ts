import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    examples: ['username', 'example@example.com', '+79998887766'],
  })
  login: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '123password',
  })
  password: string;
}
