import type { IAbstractEntity } from '../../../core/interfaces';

export interface IBanAccountEntity extends IAbstractEntity {
  accountId: number;
  initiatorId: number;
  reason: string;
  expiresAt: Date;
}
