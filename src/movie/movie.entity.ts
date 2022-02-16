import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../common';
import type { IMovieEntity } from './interfaces';
@Entity({
  name: 'movies',
})
export class MovieEntity extends AbstractEntity implements IMovieEntity {
  @Column({
    type: 'int',
    nullable: true,
  })
  public kpId: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  public imdbId: number;

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
  })
  public rating: number;

  @Column({
    type: 'varchar',
    length: '128',
  })
  public originalName: string;
}
