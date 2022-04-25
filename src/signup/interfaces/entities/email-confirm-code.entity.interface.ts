import type { IAbstractEntity } from '../../../common/interfaces';

export interface IEmailConfirmCodeEntity extends IAbstractEntity {
  email: string;
  code: number;
  confirmed: boolean;
}
