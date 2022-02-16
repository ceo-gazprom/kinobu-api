import { Injectable, Inject, Logger } from '@nestjs/common';
import { IMovieService, IMovieRepository } from './interfaces';
import { MOVIE_REPOSITORY } from './movie.constants';
import type { MovieEntity } from './movie.entity';
import type { CreateMovieDto, MovieDto } from './dto';
import { PageDto } from '../common/dto';

@Injectable()
export class MovieService implements IMovieService {
  /**
   *
   */
  private readonly logger: Logger = new Logger(MovieService.name);

  constructor(
    @Inject(MOVIE_REPOSITORY)
    private readonly movieRepository: IMovieRepository,
  ) {}

  public getMoviesList(): Promise<PageDto<MovieDto>> {
    return this.movieRepository.findAll();
  }

  /**
   * Returns a movie from the database with the specified id or error
   * @param {Number} id
   * @returns entity or error
   */
  public getById(id: number): Promise<MovieEntity> {
    return this.movieRepository.findOneByIdOrFail(id);
  }

  /**
   *
   */
  public createMovie(CreateMovieDto: CreateMovieDto): Promise<MovieEntity> {
    return this.movieRepository.create(CreateMovieDto);
  }
}
