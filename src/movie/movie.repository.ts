import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { AbstractRepository } from '../core';
import { MovieEntity } from './movie.entity';
import type { IMovieEntity } from './interfaces';
import type { IMovieRepository } from './interfaces';
import type { IPage } from '../core/interfaces';
import type { IPageOptions } from '../core/interfaces';

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
