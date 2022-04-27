import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../core';
import { IBanAccountEntity } from '../interfaces';

@Entity({
  schema: 'account',
  name: 'ban_accounts',
})
export class BanAccountEntity
  extends AbstractEntity
  implements IBanAccountEntity
{
  /**
   * Who is banned
   */
  @Column({
    unique: true,
  })
  public accountId: number;
  /**
   * Moderator account id who banned
   */
  @Column()
  public initiatorId: number;

  @Column()
  public reason: string;

  @Column()
  public expiresAt: Date;
}
