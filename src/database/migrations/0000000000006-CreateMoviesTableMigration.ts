import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMoviesTableMigration0000000000006
  implements MigrationInterface
{
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'kp_id',
            type: 'int',
          },
          {
            name: 'imdb_id',
            type: 'int',
          },
          {
            name: 'rating',
            type: 'int',
            default: 0,
          },
          {
            name: 'original_name',
            type: 'varchar',
            length: '128',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies');
  }
}
