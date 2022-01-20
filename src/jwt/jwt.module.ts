import { Module, Global } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  REFRESH_TOKEN_REPOSITORY,
  JWT_SERVICE,
  JWT_CONFIG,
} from './jwt.constants';
import { RefreshTokenEntity } from './entities';
import { RefreshTokenRepository } from './repositories';
import { JwtService } from './jwt.service';
import { JwtConfig } from './jwt.config';

const internalProviders: Provider[] = [
  {
    provide: REFRESH_TOKEN_REPOSITORY,
    useClass: RefreshTokenRepository,
  },
];

const externalProviders: Provider[] = [
  {
    provide: JWT_CONFIG,
    useClass: JwtConfig,
  },
  {
    provide: JWT_SERVICE,
    useClass: JwtService,
  },
];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([RefreshTokenEntity])],
  providers: [...internalProviders, ...externalProviders],
  exports: [...externalProviders],
})
export class JwtModule {}
