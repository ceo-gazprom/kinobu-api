import { Module, Global } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { JWT_SERVICE, JWT_CONFIG } from './jwt.constants';
import { JwtService } from './jwt.service';
import { JwtConfig } from './jwt.config';

const providers: Provider[] = [
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
  providers: [...providers],
  exports: [...providers],
})
export class JwtModule {}
