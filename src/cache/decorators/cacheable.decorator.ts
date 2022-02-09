import { applyDecorators } from '@nestjs/common';

// key, ttl ? default ttl
export function Cachable(key: string, ttl?: number): applyDecorators {

}
