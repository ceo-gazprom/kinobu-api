import { ApiProperty } from '@nestjs/swagger';
import {} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    example: '105978',
  })
  kpId?: number;

  @ApiProperty({
    example: '324234',
  })
  imdbId?: number;

  @ApiProperty({})
  originalName: string;

  @ApiProperty()
  year: number;
}
