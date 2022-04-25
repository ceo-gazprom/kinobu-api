import type { IAbstractEntity } from '../../../common/interfaces';

export interface IPhoneConfirmEntity extends IAbstractEntity {
  phone: string;
  code: number;
  confirmed: boolean;
}
