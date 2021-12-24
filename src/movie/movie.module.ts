import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { MovieController } from './movie.controller';
import { MOVIE_SERVICE, MOVIE_REPOSITORY } from './movie.constants';
import { MovieService } from './movie.service';
import { MovieRepository } from './movie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [
    { provide: MOVIE_SERVICE, useClass: MovieService },
    {
      provide: MOVIE_REPOSITORY,
      useClass: MovieRepository,
    },
  ],
})
export class MovieModule {}
