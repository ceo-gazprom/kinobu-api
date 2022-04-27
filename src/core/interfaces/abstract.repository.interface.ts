import type { SelectQueryBuilder, DeleteResult, UpdateResult } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import type { IPage } from './pagination';
import type { SortCondition } from '../types';

export interface IAbstractRepository<Entity> {
  queryBuilder(alias?: string | undefined): SelectQueryBuilder<Entity>;

  create(data: Entity | any): Promise<Entity>;

  updateById(
    id: number,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult>;

  findOneById(id: number): Promise<Entity | undefined>;

  findOneByCondition(filterCondition: any): Promise<Entity | undefined>;

  findByCondition(filterCondition: any): Promise<Entity[] | undefined>;

  findAll(): Promise<Entity[]>;

  remove(id: string): Promise<DeleteResult>;

  findWithRelations(relations: any): Promise<Entity[]>;

  findOneByIdOrFail(id: number): Promise<Entity>;

  findPaginate<K>(
    filterCondition: K,
    take?: number,
    skip?: number,
    sortCondition?: SortCondition<Entity>,
  ): Promise<IPage<Entity[]>>;
}
