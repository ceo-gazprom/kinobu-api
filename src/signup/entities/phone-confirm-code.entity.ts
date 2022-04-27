import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../core';
import type { IPhoneConfirmEntity } from '../interfaces';

@Entity({
  schema: 'account',
  name: 'phone_confirm_codes',
})
export class PhoneConfirmCodeEntity
  extends AbstractEntity
  implements IPhoneConfirmEntity
{
  @Column({ unique: true })
  public phone: string;

  @Column()
  public code: number;

  @Column({
    default: false,
  })
  public confirmed: boolean;
}
