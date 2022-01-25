import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    example: '105978',
  })
  @IsOptional()
  kpId: string;

  @ApiProperty({
    example: '324234',
  })
  @IsOptional()
  imdbId: string;

  @ApiProperty({})
  @IsNotEmpty()
  originalName: string;

  @ApiProperty()
  @IsOptional()
  year: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  file: any;
}
