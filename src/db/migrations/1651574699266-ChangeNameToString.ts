import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNameToString1651574699266 implements MigrationInterface {
  name = 'ChangeNameToString1651574699266';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "radiology" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "radiology" ADD "name" integer NOT NULL`,
    );
  }
}
