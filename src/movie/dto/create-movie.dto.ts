import { ApiProperty } from '@nestjs/swagger';
import {} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    example: '105978',
  })
  kpId: string;

  @ApiProperty({
    example: '324234',
  })
  imdbId: string;

  @ApiProperty({})
  originalName: string;

  @ApiProperty()
  year: string;
}
