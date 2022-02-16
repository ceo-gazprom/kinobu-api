import { Injectable, Inject, Logger } from '@nestjs/common';
import { IMovieService, IMovieRepository } from './interfaces';
import { MOVIE_REPOSITORY } from './movie.constants';
import type { IMovieEntity } from './interfaces';
import type { CreateMovieDto } from './dto';
import type { IPage } from '../common/interfaces';

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

  public getMoviesList(): Promise<IPage<IMovieEntity[]>> {
    return this.movieRepository.findPaginate({});
  }

  /**
   * Returns a movie from the database with the specified id or error
   * @param {Number} id
   * @returns entity or error
   */
  public getById(id: number): Promise<IMovieEntity> {
    return this.movieRepository.findOneByIdOrFail(id);
  }

  /**
   *
   */
  public createMovie(CreateMovieDto: CreateMovieDto): Promise<IMovieEntity> {
    return this.movieRepository.create(CreateMovieDto);
  }
}
