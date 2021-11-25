import { Test } from '@nestjs/testing';
import { MovieService } from '../movie.service';

describe('The MovieService', () => {
  let movieService: MovieService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MovieService],
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
