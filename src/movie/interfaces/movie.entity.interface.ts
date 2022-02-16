import { IAbstractEntity } from '../../common/interfaces';

export interface IMovieEntity extends IAbstractEntity {
  kpId: number;
  imdbId: number;
  rating: number;
  originalName: string;
}
