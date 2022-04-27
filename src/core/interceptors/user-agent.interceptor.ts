import { Injectable } from '@nestjs/common';
import type {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable()
export class UserAgentInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Get request headers, e.g.
    const userAgent = context.switchToHttp().getRequest().headers['user-agent'];

    // Not sure if headers are writeable like this, give it a try
    context.switchToHttp().getResponse().headers['x-api-key'] = 'pretty secure';

    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - userAgent}ms`)));
  }
}
