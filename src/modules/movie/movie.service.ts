import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMovieService } from './movie-service.interface';
import { MovieRepository } from './movie.repository';
import type { MovieEntity } from './movie.entity';
import type { CreateMovieDto } from './dto';

@Injectable()
export class MovieService implements IMovieService {
  constructor(
    @InjectRepository(MovieRepository)
    private readonly movieRepository: MovieRepository,
  ) {}

  /**
   *
   */
  public getMoviesList(): Promise<MovieEntity[]> {
    return this.movieRepository.find();
  }

  /**
   *
   */
  public getById(id: number): Promise<MovieEntity> {
    return this.movieRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  /**
   *
   */
  public createMovie(CreateMovieDto: CreateMovieDto): Promise<MovieEntity> {
    const movie = this.movieRepository.create(CreateMovieDto);
    return this.movieRepository.save(movie);
  }
}
