import type { IAbstractEntity } from '../../../common/interfaces';
import type { RoleType } from '../../../common/types';

export interface IAccountEntity extends IAbstractEntity {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  ip: string;
  confirmed: boolean;
  role: RoleType;
}
