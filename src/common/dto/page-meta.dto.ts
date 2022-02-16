import { ApiProperty } from '@nestjs/swagger';
import type { IPageMeta } from '../interfaces';

export class PageMetaDto implements IPageMeta {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor(meta: IPageMeta) {
    this.page = meta.page;
    this.take = meta.take;
    this.itemCount = meta.itemCount;
    this.pageCount = meta.pageCount;
    this.hasPreviousPage = meta.hasPreviousPage;
    this.hasNextPage = meta.hasNextPage;
  }
}
