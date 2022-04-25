import type { IAbstractEntity } from '../../../common/interfaces';

export interface IBanAccountEntity extends IAbstractEntity {
  accountId: number;
  initiatorId: number;
  reason: string;
  expiresAt: Date;
}
