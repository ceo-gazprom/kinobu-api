import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common';
import type { IEmailConfirmCodeEntity } from '../interfaces';

@Entity({
  schema: 'account',
  name: 'email_confirm_codes',
})
export class EmailConfirmCodeEntity
  extends AbstractEntity
  implements IEmailConfirmCodeEntity
{
  @Column({ unique: true })
  public email: string;

  @Column()
  public code: number;

  @Column({
    default: false,
  })
  public confirmed: boolean;
}
