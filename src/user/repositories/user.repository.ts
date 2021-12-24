import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from '../../common';
import { IUserRepository } from '../interfaces';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository
  extends AbstractRepository<UserEntity>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  // // Todo: Дописать возможность авторизации по login email phone number
  // public checkUserAuthData(login, password): Promise<UserEntity> {
  //   return this.findOneOrFail({
  //     where: {},
  //   });
  // }
}
