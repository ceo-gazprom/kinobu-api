import type { ExecutionContext } from '@nestjs/common';
import type { IAuthGuard } from '@nestjs/passport';
import type { IAccountEntity } from './entities';

export interface IJwtAuthGuard extends IAuthGuard {
  handleRequest(err: unknown, account: IAccountEntity): any;
  canActivate(context: ExecutionContext): Promise<boolean>;
}
