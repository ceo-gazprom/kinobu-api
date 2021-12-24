import { getClientIp } from 'request-ip';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestIP = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return getClientIp(request);
  },
);
