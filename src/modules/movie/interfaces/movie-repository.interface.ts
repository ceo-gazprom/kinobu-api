import { IAbstractRepository } from '../../../repositories';
import type { MovieEntity } from '../movie.entity';

export class IMovieRepository extends IAbstractRepository<MovieEntity> {}
