/**
 * @file Cache interceptor
 * @module cache/decorator
 * @author Robert Wacker <https://github.com/yuwacker>
 */

import { Injectable, Inject } from '@nestjs/common';
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

  constructor(
    @Inject(CACHE_CONFIG) private readonly cacheConfig: ICacheConfig,
    @Inject(CACHE_SERVICE) private readonly cacheDriver: ICacheService,
    @Inject(Reflector.name) private readonly reflector: Reflector,
  ) {}

  /**
   * 
   * @param context 
   * @param next 
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
