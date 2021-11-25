import { ApiProperty } from '@nestjs/swagger';
import {} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  kpId?: number;

  @ApiProperty()
  imdbId?: number;

  @ApiProperty()
  originalName: string;

  @ApiProperty()
  year: number;
}
