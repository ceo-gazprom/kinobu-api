import type { IAbstractEntity } from '../../../core/interfaces';

export interface IPhoneConfirmEntity extends IAbstractEntity {
  phone: string;
  code: number;
  confirmed: boolean;
}
