import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveImages1655840895059 implements MigrationInterface {
  name = 'RemoveImages1655840895059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "radiology" RENAME COLUMN "images" TO "image"`,
    );
    await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "image"`);
    await queryRunner.query(
      `ALTER TABLE "radiology" ADD "image" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "image"`);
    await queryRunner.query(
      `ALTER TABLE "radiology" ADD "image" text array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "radiology" RENAME COLUMN "image" TO "images"`,
    );
  }
}
