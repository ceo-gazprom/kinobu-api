import { IAbstractRepository } from '../../common/interfaces';
import type { UserEntity } from '../entities';

export type IUserRepository = IAbstractRepository<UserEntity>;
