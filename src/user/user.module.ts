import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { UserRepository } from './repositories';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { USER_SERVICE, USER_REPOSITORY } from './user.constants';

const providers: Provider[] = [
  {
    useClass: UserService,
    provide: USER_SERVICE,
  },
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [...providers],
  exports: [...providers],
})
export class UserModule {}
