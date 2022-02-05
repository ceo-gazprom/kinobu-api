import type { IAbstractRepository } from '../../common/interfaces';
import type { EmailConfirmCodeEntity } from '../entities';

export type IEmailConfirmCodeRepository =
  IAbstractRepository<EmailConfirmCodeEntity>;
