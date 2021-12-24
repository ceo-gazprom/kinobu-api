import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  /**
   *
   */
  public findById(id: number): Promise<UserEntity> {
    return this.findOneOrFail({
      where: {
        id,
      },
    });
  }

  /**
   *
   */
  public findByEmail(email: string): Promise<UserEntity> {
    return this.findOneOrFail({
      where: {
        email,
      },
    });
  }

  // // Todo: Дописать возможность авторизации по login email phone number
  // public checkUserAuthData(login, password): Promise<UserEntity> {
  //   return this.findOneOrFail({
  //     where: {},
  //   });
  // }
}
