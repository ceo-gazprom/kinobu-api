import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmailConfirmCodesTableMigration0000000000003
  implements MigrationInterface
{
  private readonly schemaName = 'account';
  private readonly tableName = 'phone_confirm_codes';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        schema: this.schemaName,
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'phone',
            type: 'int',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'code',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'confirmed',
            type: 'boolean',
            default: false,
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
    await queryRunner.dropTable(this.tableName);
  }
}
