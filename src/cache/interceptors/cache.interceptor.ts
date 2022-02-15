/**
 * @file Cache interceptor
 * @module cache/interceptors
 * @author Robert Wacker <https://github.com/yuwacker>
 */

import { Injectable, Inject, Logger } from '@nestjs/common';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Observable, of, tap } from 'rxjs';
import { CACHE_CONFIG, CACHE_SERVICE } from '../cache.constants';
import type { ICacheConfig, ICacheService } from '../interfaces';

/**
 *
 */
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private logger = new Logger(CacheInterceptor.name);

  /**
   * @constructor
   * @param cacheConfig -
   * @param cacheDriver -
   * @param reflector -
   */
  constructor(
    @Inject(CACHE_CONFIG) private readonly cacheConfig: ICacheConfig,
    @Inject(CACHE_SERVICE) private readonly cacheDriver: ICacheService,
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
     * Получаем переданные аргументы
     */
    const condition = await this.reflector.get(
      CACHE_COND_METADATA,
      context.getHandler(),
    );

    if (typeof condition === 'function' && !condition(context))
      return next.handle();
    if (request.method !== 'GET') return next.handle();

    /**
     * Получаем данные из кэша
     */
    const value = await this.cacheDriver.get(cacheKey);

    /**
     * Узнаем время жизни кэша
     */
    const ttl =
      typeof ttlValueOrFactory === 'function'
        ? await ttlValueOrFactory(context)
        : ttlValueOrFactory || 0;

    if (value !== undefined) {
      return of(value);
    } else {
      return next.handle().pipe(
        tap(
          async (response) =>
            await this.cacheManager.set(cacheKey, await response, {
              ttl: ttl
            })
        )
      );
  }
}
