import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class AddUsers1636320330663 implements MigrationInterface {
  private readonly usersTable = new Table({
    name: 'users',
    columns: [
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isUnique: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }),
      new TableColumn({ name: 'firstName', type: 'varchar' }),
      new TableColumn({ name: 'lastName', type: 'varchar' }),
      new TableColumn({ name: 'email', type: 'varchar', isUnique: true }),
      new TableColumn({ name: 'password', type: 'varchar', isUnique: true }),
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()'
      }),
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()'
      })
    ]
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryRunner.createTable(this.usersTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.usersTable);
  }
}
