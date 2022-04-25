import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import type { IAccountEntity } from '../../account';

export const AuthAccount = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.account;
  },
);

// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const UserAgent = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return JSON.stringify(request);
//   },
// );
