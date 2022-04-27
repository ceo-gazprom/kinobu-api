import type { IAbstractRepository } from '../../core/interfaces';
import type { IMovieEntity } from './movie.entity.interface';

export type IMovieRepository = IAbstractRepository<IMovieEntity>;
