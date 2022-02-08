import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common';

@Entity({
  schema: 'account',
  name: 'email_confirm_codes',
})
export class EmailConfirmCodeEntity extends AbstractEntity {
  @Column({ unique: true })
  public email: string;

  @Column()
  public code: number;

  @Column({
    default: false,
  })
  public confirmed: boolean;
}
