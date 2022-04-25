import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos';

export interface IUserService {
  getByEmail(email: string): Promise<UserEntity | undefined>;
  getById(id: number): Promise<UserEntity | undefined>;
  createUser(userData: CreateUserDto): Promise<UserEntity>;
  // checkUserAuthData(login: string, password: string): Promise<boolean>;
}
