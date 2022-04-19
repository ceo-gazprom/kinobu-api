import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { RoleType } from '../types';
import type { IAccountEntity } from '../interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleType[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const account = <IAccountEntity>request.user;

    return roles.includes(account.role);
  }
}
