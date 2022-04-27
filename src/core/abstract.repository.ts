import type {
  DeleteResult,
  UpdateResult,
  Repository,
  SelectQueryBuilder,
  FindManyOptions,
} from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import type { IAbstractRepository, IPage, IPageMeta } from './interfaces';
import type { SortCondition } from './types';

/**
 * Abstract Repository
 *
 * @description This class is an abstract class for all custom repositories.
 * An additional layer of abstraction helps to bring the general functionality
 * of custom repositories into one file.
 * And hide access to the basic functions of the repository from typeorm
 * or extend some of them.
 */
export abstract class AbstractRepository<Entity>
  implements IAbstractRepository<Entity>
{
  /**
   * Number of rows for pagination by default
   */
  private readonly defaultTake = 10;
  /**
   * Indent rows when sorting in default pagination
   */
  private readonly defaultSkip = 0;
  /**
   * Sort type in default pagination
   */
  private readonly defaultSortType = 'ASC';
  /**
   * Sort field in default pagination
   */
  private readonly defaultSortField = 'id';

  constructor(private entity: Repository<Entity>) {}

  public queryBuilder(alias?: string | undefined): SelectQueryBuilder<Entity> {
    return this.entity.createQueryBuilder(alias);
  }

  public create(data: Entity | any): Promise<Entity> {
    return this.entity.save(data);
  }

  public updateById(
    id: number,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    return this.entity.update(id, partialEntity);
  }

  public findOneById(id: number): Promise<Entity | undefined> {
    return this.entity.findOne(id);
  }

  public find(options: FindManyOptions): Promise<Entity[]> {
    return this.entity.find(options);
  }

  public findOneByCondition<K>(
    filterCondition: K,
  ): Promise<Entity | undefined> {
    return this.entity.findOne({ where: filterCondition });
  }

  public findByCondition<K>(filterCondition: K): Promise<Entity[] | undefined> {
    return this.entity.find({ where: filterCondition });
  }

  public findWithRelations(relations: any): Promise<Entity[]> {
    return this.entity.find(relations);
  }

  public findAll(): Promise<Entity[]> {
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
  public findOneByIdOrFail(id: number): Promise<Entity> {
    return this.entity.findOneOrFail(id);
  }

  /**
   *
   * @param filterCondition - conditions for fetching rows from the table
   * @returns paginated result from table
   */
  public async findPaginate<K>(
    filterCondition: K,
    take?: number,
    skip?: number,
    sortCondition?: SortCondition<Entity>,
  ): Promise<IPage<Entity[]>> {
    /**
     * Sorting
     */
    let sorting;
    if (sortCondition) {
      sorting = sortCondition;
    } else {
      sorting = { [this.defaultSortField]: this.defaultSortType };
    }

    const taking = take ? take : this.defaultTake;
    const skiping = skip ? skip : this.defaultSkip;

    const findCondition = {
      where: filterCondition,
      take: taking,
      skip: skiping,
      // order: sorting,
    };

    /**
     * Get rows
     */
    const items = await this.find(findCondition);

    /**
     * Get count
     */
    const count = await this.entity.count(findCondition);

    const result = {
      data: items,
      meta: this.generatePageMeta(count, taking, skiping),
    };

    return result;
  }

  private generatePageMeta(
    count: number,
    skip: number,
    take: number,
  ): IPageMeta {
    const perPageItems = count / take;
    const page = skip / perPageItems + 1;
    const pageCount = count / perPageItems;
    const hasPreviousPage = skip > perPageItems ? true : false;
    const hasNextPage = count - skip - take > 0 ? true : false;

    return {
      page,
      take,
      itemCount: count,
      pageCount,
      hasPreviousPage,
      hasNextPage,
    };
  }
}
