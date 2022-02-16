import { Order } from '../constants';

export interface IPageOptions {
  order: Order;
  page: number;
  take: number;
  skip: number;
  q?: string;
}
