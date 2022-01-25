import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { MovieController } from './movie.controller';
import { MOVIE_SERVICE, MOVIE_REPOSITORY } from './movie.constants';
import { MovieService } from './movie.service';
import { MovieRepository } from './movie.repository';
import { ImageModule } from '../image';

const providers: Provider[] = [
  { provide: MOVIE_SERVICE, useClass: MovieService },
  {
    provide: MOVIE_REPOSITORY,
    useClass: MovieRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), ImageModule],
  controllers: [MovieController],
  providers: [...providers],
})
export class MovieModule {}
