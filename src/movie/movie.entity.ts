import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'movies',
})
export class MovieEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'kp_id',
    type: 'int',
    nullable: true,
  })
  public kpId: number;

  @Column({
    name: 'imdb_id',
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

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  private createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  private updatedAt: Date;
}
