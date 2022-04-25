import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { IAccountEntity } from '../../account';
import type { Request } from 'express';
import type { IJwtAuthGuard } from '../interfaces';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IJwtAuthGuard {
  public handleRequest(err: unknown, account: IAccountEntity): any {
    return account;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user }: Request = context.switchToHttp().getRequest();

    return user ? true : false;
  }
}
