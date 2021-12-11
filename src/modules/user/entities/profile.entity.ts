import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'profiles',
})
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public photo: string;

  @Column()
  public cover: string;

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
