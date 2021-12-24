import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from './interfaces';
import { UserRepository } from './repositories';
import type { CreateUserDto } from './dto';
import type { UserEntity } from './entities';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  /**
   *
   */
  public getByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findByEmail(email);
  }

  /**
   *
   */
  public getById(id: number): Promise<UserEntity> {
    return this.userRepository.findById(id);
  }

  /**
   *
   */
  public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // /**
  //  *
  //  */
  // public checkUserAuthData(login: string, password: string): Promise<boolean> {
  //   return this.userRepository.checkUserAuthData(login, password);
  // }
}
