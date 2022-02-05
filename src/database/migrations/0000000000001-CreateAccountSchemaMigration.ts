import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountSchemaMigration0000000000001
  implements MigrationInterface
{
  private readonly schemaName = 'account';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema(this.schemaName);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.schemaName);
  }
}
