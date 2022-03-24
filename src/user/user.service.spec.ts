import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { USER_REPOSITORY } from './user.constants';

describe('The UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useValue: {},
        },
      ],
    }).compile();

    userService = await module.get(UserService);
  });

  describe('', async () => {
    it('', async () => {
      const result = await userService.getByEmail('text@text.ru');
      expect(result).toBe('sd');
    });
  });
});

// import { Injectable, Inject } from '@nestjs/common';
// import { IUserService, IUserRepository } from './interfaces';
// import { USER_REPOSITORY } from './user.constants';
// import { UserRepository } from './repositories';
// import type { CreateUserDto } from './dto';
// import type { UserEntity } from './entities';

// @Injectable()
// export class UserService implements IUserService {
//   constructor(
//     @Inject(USER_REPOSITORY)
//     private readonly userRepository: IUserRepository,
//   ) {}

//   /**
//    *
//    */
//   public getByEmail(email: string): Promise<UserEntity | undefined> {
//     return this.userRepository.findOneByCondition({
//       email,
//     });
//   }

//   /**
//    *
//    */
//   public getById(id: number): Promise<UserEntity | undefined> {
//     return this.userRepository.findOneById(id);
//   }

//   /**
//    *
//    */
//   public createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
//     return this.userRepository.create(createUserDto);
//   }

//   // /**
//   //  *
//   //  */
//   // public checkUserAuthData(login: string, password: string): Promise<boolean> {
//   //   return this.userRepository.checkUserAuthData(login, password);
//   // }
// }
