import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { PUBLIC_ROUTE_KEY } from '../account.constants';

export const PublicRoute = (isPublic = false): CustomDecorator =>
  SetMetadata(PUBLIC_ROUTE_KEY, isPublic);
