import { ApiProperty } from '@nestjs/swagger';
import { IMovieEntity } from '../interfaces';

export class MovieDto {
  @ApiProperty({
    example: '1',
  })
  id: number;

  @ApiProperty({
    example: '105978',
  })
  kpId: number;

  @ApiProperty({
    example: '324234',
  })
  imdbId: number;

  @ApiProperty({
    example: '712',
  })
  rating: number;

  @ApiProperty({
    example: 'Fight Club',
  })
  originalName: string;

  constructor(movieEntity: IMovieEntity) {
    this.id = movieEntity.id;
    this.kpId = movieEntity.kpId;
    this.imdbId = movieEntity.imdbId;
    this.rating = movieEntity.rating;
    this.originalName = movieEntity.originalName;
  }
}
