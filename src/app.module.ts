import { Module } from '@nestjs/common';
import { AccountModule } from './account';
import {} from './cache-manager';
import { CommentModule } from './comment';
// import {} from './cron';
import { DatabaseModule } from './database';
// import { HealthModule } from './health';
import { JwtModule } from './jwt';
import { MovieModule } from './movie';
// import {} from './reviews';
import { StorageModule } from './storage';
import { UserModule } from './user';

@Module({
  imports: [
    AccountModule,
    CommentModule,
    DatabaseModule,
    // HealthModule,
    JwtModule,
    MovieModule,
    StorageModule,
    UserModule,
  ],
})
export class AppModule {}
