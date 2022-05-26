import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageToLabResult1653578556184 implements MigrationInterface {
  name = 'AddImageToLabResult1653578556184';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_result" ADD "image" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lab_result" DROP COLUMN "image"`);
  }
}
