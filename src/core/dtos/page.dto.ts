import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from './page-meta.dto';
import type { IPage } from '../interfaces';

export class PageDto<T> implements IPage<T> {
  @ApiProperty({ isArray: true })
  readonly data: T;

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: T, meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
