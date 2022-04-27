import { IAbstractRepository } from '../../core/interfaces';
import type { UserEntity } from '../entities';

export type IUserRepository = IAbstractRepository<UserEntity>;
