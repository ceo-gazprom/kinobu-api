import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common';
import type { IAccountLoginEntity } from '../interfaces';

/**
 * Account activity entity
 * @description The entity stores data about account logins and current sessions on different devices.
 * What allows you to use one account on multiple devices.
 */
@Entity({
  schema: 'account',
  name: 'account_logins',
})
export class AccountLoginEntity
  extends AbstractEntity
  implements IAccountLoginEntity
{
  accountId: number;

  @Column()
  device: string;

  @Column()
  ipAddress: string;

  @Column()
  refereshToken: string;

  @Column({
    default: false,
  })
  isDeleted: boolean;

  @Column()
  deletedAt: Date;
}
