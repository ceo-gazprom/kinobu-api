import type { SelectQueryBuilder, DeleteResult, UpdateResult } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IAbstractRepository<T> {
  queryBuilder(alias?: string | undefined): SelectQueryBuilder<T>;

  create(data: T | any): Promise<T>;

  updateById(
    id: number,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult>;

  findOneById(id: number): Promise<T | undefined>;

  findOneByCondition(filterCondition: any): Promise<T | undefined>;

  findByCondition(filterCondition: any): Promise<T[] | undefined>;

  findAll(): Promise<T[]>;

  remove(id: string): Promise<DeleteResult>;

  findWithRelations(relations: any): Promise<T[]>;

  findOneByIdOrFail(id: number): Promise<T>;
}
