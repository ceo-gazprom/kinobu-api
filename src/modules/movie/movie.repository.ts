import { Repository, EntityRepository } from 'typeorm';
import { MovieEntity } from './movie.entity';

@EntityRepository(MovieEntity)
export class MovieRepository extends Repository<MovieEntity> {}
