import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ChangePasswordAccountDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  accountId: number;

  @MinLength(6)
  @MaxLength(60)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '123password',
  })
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(60)
  @ApiProperty({
    required: true,
    example: '456password',
  })
  newPassword: string;
}
