import { Test } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { MovieService } from '../movie.service';
import { MovieRepository } from '../movie.repository';

describe('The movie service', () => {
  let movieService: MovieService;

  /** Init test module */
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getCustomRepositoryToken(MovieRepository),
          useValue: createMock<MovieRepository>(),
        },
      ],
    }).compile();

    movieService = await module.get(MovieService);
  });

  describe('when accessing the data of authenticating user', () => {
    it('should attempt to get the user by email', async () => {
      const getMovieListSpy = jest.spyOn(movieService, 'getMoviesList');
      await movieService.getMoviesList();

      expect(getMovieListSpy).toBeCalledTimes(1);
    });
  });
});
