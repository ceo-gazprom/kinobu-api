import type { IAbstractEntity } from '../../../common/interfaces';

export interface IAccountLoginEntity extends IAbstractEntity {
  accountId: number;
  device: string;
  ipAddress: string;
  refereshToken: string;
  isDeleted: boolean;
}
