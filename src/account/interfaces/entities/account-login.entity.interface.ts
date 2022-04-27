import type { IAbstractEntity } from '../../../core/interfaces';

export interface IAccountLoginEntity extends IAbstractEntity {
  accountId: number;
  device: string;
  ipAddress: string;
  refereshToken: string;
  isDeleted: boolean;
}
