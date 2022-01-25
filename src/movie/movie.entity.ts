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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
