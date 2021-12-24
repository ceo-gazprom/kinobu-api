import {
  DeleteResult,
  UpdateResult,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IAbstractRepository } from './interfaces';

/**
 * Abstract Repository
 * @author Robert Wacker
 *
 * @description This class is an abstract class for all custom repositories.
 * An additional layer of abstraction helps to bring the general functionality
 * of custom repositories into one file.
 * And hide access to the basic functions of the repository from typeorm
 * or extend some of them.
 */
export abstract class AbstractRepository<T> implements IAbstractRepository<T> {
  constructor(private entity: Repository<T>) {}

  public queryBuilder(alias?: string | undefined): SelectQueryBuilder<T> {
    return this.entity.createQueryBuilder(alias);
  }

  public create(data: T | any): Promise<T> {
    return this.entity.save(data);
  }

  public updateById(
    id: number,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return this.entity.update(id, partialEntity);
  }

  public findOneById(id: number): Promise<T | undefined> {
    return this.entity.findOne(id);
  }

  public findOneByCondition<K>(filterCondition: K): Promise<T | undefined> {
    return this.entity.findOne({ where: filterCondition });
  }

  public findByCondition<K>(filterCondition: K): Promise<T[] | undefined> {
    return this.entity.find({ where: filterCondition });
  }

  public findWithRelations(relations: any): Promise<T[]> {
    return this.entity.find(relations);
  }

  public findAll(): Promise<T[]> {
    return this.entity.find();
  }

  public remove(id: string): Promise<DeleteResult> {
    return this.entity.delete(id);
  }

  /**
   * Returns the first row with the specified id
   * @param {Number} id
   * @returns entity or error
   */
  public findOneByIdOrFail(id: number): Promise<T> {
    return this.entity.findOneOrFail(id);
  }
}
