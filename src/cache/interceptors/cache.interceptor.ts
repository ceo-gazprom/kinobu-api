/**
 * @file Cache interceptor
 * @module cache/interceptors
 * @author Robert Wacker <https://github.com/yuwacker>
 */

import { Injectable, Inject } from '@nestjs/common';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { of, tap } from 'rxjs';
import type { Observable } from 'rxjs';
import {
  CACHE_KEY_METADATA,
  CACHE_SERVICE,
  CACHE_TTL_METADATA,
} from '../cache.constants';
import type { ICacheService } from '../interfaces';

/**
 *
 */
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  protected allowedMethods = ['GET'];

  /**
   * @constructor
   * @param cacheConfig -
   * @param cacheDriver -
   * @param reflector -
   */
  constructor(
    @Inject(CACHE_SERVICE) private readonly cacheService: ICacheService,
    @Inject(Reflector.name) private readonly reflector: Reflector,
  ) {}

  /**
   * @description
   * @param context an `ExecutionContext` object providing methods to access the
   * route handler and class about to be invoked.
   * @param next a reference to the `CallHandler`, which provides access to an
   * `Observable` representing the response stream from the route handler.
   * @returns
   */
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    /**
     * Получаем request по http пртаколу
     */
    const request = context.switchToHttp().getRequest();

    /**
     * Если метод отличается от get то не применяется декоратор
     */
    if (!this.allowedMethods.includes(request.method)) return next.handle();

    const cacheKey =
      this.reflector.get<string>(CACHE_KEY_METADATA, context.getHandler()) ||
      request.url;

    /**
     * Получаем данные из кэша
     */
    const value = await this.cacheService.get(cacheKey);

    /**
     * Узнаем время жизни кэша
     */
    const ttl =
      this.reflector.get(CACHE_TTL_METADATA, context.getHandler()) ?? null;

    if (value !== undefined) {
      return of(value);
    } else {
      return next
        .handle()
        .pipe(
          tap(
            async (response) =>
              await this.cacheService.set(cacheKey, await response, ttl),
          ),
        );
    }
  }
}
