import {
  Controller,
  Inject,
  Get,
  Post,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { MOVIE_SERVICE } from './di.constnt';
import { IMovieService } from './movie-service.interface';
import { MovieDto, CreateMovieDto } from './dto';
import { ParseIntPipe } from '../../pipes';

@Controller('/v1/movie')
@ApiTags('MOVIES')
export class MovieController {
  constructor(
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService,
  ) {}

  @Get('/list')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get movies list',
    type: [MovieDto],
  })
  public async getMoviesList(): Promise<MovieDto[]> {
    const movies = await this.movieService.getMoviesList();
    return movies.map((movie) => MovieDto.fromEntity(movie));
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get movie data by id',
    type: MovieDto,
  })
  public async getMovieById(
    @Param('id', new ParseIntPipe()) movieId: number,
  ): Promise<MovieDto> {
    const movie = await this.movieService.getById(movieId);
    return MovieDto.fromEntity(movie);
  }

  @Post()
  public async createMovie(
    @Body() movieData: CreateMovieDto,
  ): Promise<MovieDto> {
    const movie = await this.movieService.createMovie(movieData);
    return MovieDto.fromEntity(movie);
  }
}
