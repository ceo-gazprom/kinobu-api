import { IAbstractEntity } from '../../core/interfaces';

export interface IMovieEntity extends IAbstractEntity {
  kpId: number;
  imdbId: number;
  rating: number;
  originalName: string;
}
