import { ApiProperty } from '@nestjs/swagger';
import { MovieEntity } from '../movie.entity';

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

  static fromEntity(movieEntity: MovieEntity): MovieDto {
    const movie = new MovieDto();

    movie.id = movieEntity.id;
    movie.kpId = movieEntity.kpId;
    movie.imdbId = movieEntity.imdbId;
    movie.rating = movieEntity.rating;
    movie.originalName = movieEntity.originalName;

    return movie;
  }
}
