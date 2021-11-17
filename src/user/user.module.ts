import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { USER_SERVICE } from './di.constants';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [
    {
      useClass: UserService,
      provide: USER_SERVICE,
    },
  ],
})
export class UserModule {}
