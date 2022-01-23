import {
  Controller,
  Inject,
  Get,
  Post,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MOVIE_SERVICE } from './movie.constants';
import { IMovieService } from './interfaces';
import { MovieDto, CreateMovieDto } from './dto';
import { JwtAuthGuard } from '../common/guards';

@Controller({
  version: '1',
  path: 'movie',
})
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

  @Get('/:movieId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get movie by id' })
  @ApiParam({
    name: 'movieId',
    description: 'movie id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get movie data by id',
    type: MovieDto,
  })
  public async getMovieById(
    @Param('movieId') movieId: number,
  ): Promise<MovieDto> {
    const movie = await this.movieService.getById(movieId);
    return MovieDto.fromEntity(movie);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create movie' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get movie data by id',
    type: MovieDto,
  })
  public async createMovie(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<MovieDto> {
    console.log(createMovieDto);
    const movie = await this.movieService.createMovie(createMovieDto);
    return MovieDto.fromEntity(movie);
  }
}
