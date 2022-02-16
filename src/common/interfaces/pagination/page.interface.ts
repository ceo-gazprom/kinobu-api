import type { IPageMeta } from './page-meta.interface';

export interface IPage<T> {
  data: T[];
  meta: IPageMeta;
}
