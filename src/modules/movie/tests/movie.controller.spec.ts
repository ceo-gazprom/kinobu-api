import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { MovieController } from '../movie.controller';

describe('MovieController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [],
      imports: [],
    }).compile();
  });

  describe('getMovieById', () => {
    it('should return movie data', () => {
      const appController = app.get<MovieController>(MovieController);
      expect(appController.getMovieById()).toBe('http://localhost');
    });
  });
});
