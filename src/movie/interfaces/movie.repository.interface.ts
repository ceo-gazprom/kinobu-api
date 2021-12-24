import { IAbstractRepository } from '../../common/interfaces';
import type { MovieEntity } from '../movie.entity';

export type IMovieRepository = IAbstractRepository<MovieEntity>;
