import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto';

export interface IUserService {
  getByEmail(email: string): Promise<UserEntity>;
  getById(id: number): Promise<UserEntity>;
  createUser(userData: CreateUserDto): Promise<UserEntity>;
  // checkUserAuthData(login: string, password: string): Promise<boolean>;
}
