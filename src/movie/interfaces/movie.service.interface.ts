import type { IMovieEntity } from '../interfaces';
import type { IPage } from '../../common/interfaces';
import type { CreateMovieDto } from '../dtos';

export interface IMovieService {
  getMoviesList(): Promise<IPage<IMovieEntity[]>>;
  getById(id: number): Promise<IMovieEntity>;
  createMovie(movieData: CreateMovieDto): Promise<IMovieEntity>;
}
