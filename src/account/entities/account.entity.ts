import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common';
import type { IAccountEntity } from '../interfaces';
import { RoleType } from '../../common/types/role-type.enum';

@Entity({
  schema: 'account',
  name: 'accounts',
})
export class AccountEntity extends AbstractEntity implements IAccountEntity {
  @Column({ unique: true })
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column({
    unique: true,
  })
  public phoneNumber: string;

  @Column()
  public password: string;

  @Column()
  public ip: string;

  @Column({
    default: false,
  })
  public confirmed: boolean;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.USER,
  })
  public role: RoleType;
}
