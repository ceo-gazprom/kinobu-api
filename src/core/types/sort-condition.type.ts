export type SortCondition<Entity> = {
  [Key in keyof Entity]: 'ASC' | 'DESC';
};
