import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common';

@Entity({
  schema: 'account',
  name: 'reserved_usernames',
})
export class ReservedUsernameEntity extends AbstractEntity {
  @Column({ unique: true, nullable: false })
  public username: string;
}
