import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MediaType } from '../../constants';

@Entity({
  name: 'comments',
})
export class CommentEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'user_id',
  })
  public userId: number;

  @Column()
  public mediaType: MediaType;

  @Column()
  public text: string;

  @Column({
    name: 'contain_spoiler',
  })
  public containSpoiler: boolean;

  @Column()
  public banned: boolean;

  @Column({
    name: 'reason_ban',
  })
  public reasonBan: string;

  @Column({
    name: 'moderator_id',
  })
  public moderatorId: string;

  @Column()
  public deleted: boolean;
}
