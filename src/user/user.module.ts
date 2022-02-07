import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { UserRepository } from './repositories';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { USER_SERVICE, USER_REPOSITORY } from './user.constants';

const internalProviders: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

const externalProviders: Provider[] = [
  {
    useClass: UserService,
    provide: USER_SERVICE,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [...internalProviders, ...externalProviders],
  exports: [...externalProviders],
})
export class UserModule {}
