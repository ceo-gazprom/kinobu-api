import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { AbstractRepository } from '../../core';
import type { IRefreshTokenRepository } from '../interfaces';
import { RefreshTokenEntity } from '../entities';

@Injectable()
export class RefreshTokenRepository
  extends AbstractRepository<RefreshTokenEntity>
  implements IRefreshTokenRepository
{
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {
    super(refreshTokenRepository);
  }

  // // Todo: Дописать возможность авторизации по login email phone number
  // public checkUserAuthData(login, password): Promise<UserEntity> {
  //   return this.findOneOrFail({
  //     where: {},
  //   });
  // }
}
