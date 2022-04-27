import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
// import {} from './cache';
import { CommentModule } from './comment';
import { CronModule } from './cron';
// import {} from './cron';
import { DatabaseModule } from './database';
// import { HealthModule } from './health';
import { JwtModule } from './jwt';
import { MovieModule } from './movie';
// import {} from './reviews';
import { SignupModule } from './signup';
import { UserModule } from './user';

@Module({
  imports: [
    AccountModule,
    AuthModule,
    CommentModule,
    CronModule,
    DatabaseModule,
    // HealthModule,
    JwtModule,
    MovieModule,
    SignupModule,
    UserModule,
  ],
})
export class AppModule {}
