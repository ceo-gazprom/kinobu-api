import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './movie.repository';
import { MovieController } from './movie.controller';
import { MOVIE_SERVICE } from './di.constnt';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository])],
  controllers: [MovieController],
  providers: [{ useClass: MovieService, provide: MOVIE_SERVICE }],
})
export class MovieModule {}

{provide: REP_TOKEN, useFactory:(connection: Connection)=>connection.getRepository<AccessCountry>(AccessCountry)}