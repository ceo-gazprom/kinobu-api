import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { USER_SERVICE } from './di.constant';

const providers: Provider[] = [
  {
    useClass: UserService,
    provide: USER_SERVICE,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [...providers],
  exports: [...providers],
})
export class UserModule {}
