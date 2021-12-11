import type { MovieEntity } from '../movie.entity';
import type { CreateMovieDto } from '../dto';

export interface IMovieService {
  getMoviesList(): Promise<MovieEntity[]>;
  getById(id: number): Promise<MovieEntity>;
  createMovie(movieData: CreateMovieDto): Promise<MovieEntity>;
}
