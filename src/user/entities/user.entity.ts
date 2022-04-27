import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../core';

@Entity({
  name: 'users',
})
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  public username: string;

  @Column({
    type: 'int',
    default: 0,
  })
  public rating: number;
}
