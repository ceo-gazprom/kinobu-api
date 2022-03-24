import type { IAbstractRepository } from '../../common/interfaces';
import type { IMovieEntity } from './movie.entity.interface';

export type IMovieRepository = IAbstractRepository<IMovieEntity>;
