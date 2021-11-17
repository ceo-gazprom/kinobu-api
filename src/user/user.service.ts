import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from './users-service.interface';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async getByEmail(email: string) {}

  public async create(userData: CreateUserDto) {}
}
