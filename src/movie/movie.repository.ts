import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from '../common';
import { MovieEntity } from './movie.entity';
import { IMovieRepository } from './interfaces';

@Injectable()
export class MovieRepository
  extends AbstractRepository<MovieEntity>
  implements IMovieRepository
{
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {
    super(movieRepository);
  }
}
