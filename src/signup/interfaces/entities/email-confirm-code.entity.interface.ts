import type { IAbstractEntity } from '../../../core/interfaces';

export interface IEmailConfirmCodeEntity extends IAbstractEntity {
  email: string;
  code: number;
  confirmed: boolean;
}
