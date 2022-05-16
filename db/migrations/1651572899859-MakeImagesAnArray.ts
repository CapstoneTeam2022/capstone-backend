import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeImagesAnArray1651572899859 implements MigrationInterface {
  name = 'MakeImagesAnArray1651572899859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "images"`);
    await queryRunner.query(
      `ALTER TABLE "radiology" ADD "images" text array NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "images"`);
    await queryRunner.query(
      `ALTER TABLE "radiology" ADD "images" character varying NOT NULL`,
    );
  }
}
