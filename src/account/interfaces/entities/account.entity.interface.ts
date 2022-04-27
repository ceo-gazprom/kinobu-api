import type { IAbstractEntity } from '../../../core/interfaces';
import type { RoleType } from '../../../core/types';

export interface IAccountEntity extends IAbstractEntity {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  ip: string;
  confirmed: boolean;
  role: RoleType;
}
