import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { AbstractRepository } from '../common';
import { MovieEntity } from './movie.entity';
import type { IMovieEntity } from './interfaces';
import type { IMovieRepository } from './interfaces';
import type { IPage } from '../common/interfaces';
import type { IPageOptions } from '../common/interfaces';

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
