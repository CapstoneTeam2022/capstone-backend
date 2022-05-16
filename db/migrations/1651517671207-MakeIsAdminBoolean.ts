import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeIsAdminBoolean1651517671207 implements MigrationInterface {
  name = 'MakeIsAdminBoolean1651517671207';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isAdmin" character varying NOT NULL`,
    );
  }
}
