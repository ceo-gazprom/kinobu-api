import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../core';
import { MediaType } from './types';

@Entity({
  name: 'comments',
})
export class CommentEntity extends AbstractEntity {
  @Column()
  public userId: number;

  @Column()
  public mediaType: MediaType;

  @Column()
  public text: string;

  @Column()
  public containSpoiler: boolean;

  @Column()
  public banned: boolean;

  @Column()
  public reasonBan: string;

  @Column()
  public moderatorId: string;

  @Column()
  public deleted: boolean;
}
