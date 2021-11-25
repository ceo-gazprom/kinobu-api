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
  id: number;

  @Column({
    name: 'kp_id',
    type: 'int',
    nullable: true,
  })
  kpId: number;

  @Column({
    name: 'imdb_id',
    type: 'int',
    nullable: true,
  })
  imdbId: number;

  @Column({
    type: 'int',
    default: 0,
  })
  rating: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
