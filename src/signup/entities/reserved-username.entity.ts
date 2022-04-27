import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../core';
import type { IReservedUsernameEntity } from '../interfaces';

@Entity({
  schema: 'account',
  name: 'reserved_usernames',
})
export class ReservedUsernameEntity
  extends AbstractEntity
  implements IReservedUsernameEntity
{
  @Column({ unique: true, nullable: false })
  public username: string;
}
