import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefIdToPatient1652904002996 implements MigrationInterface {
  name = 'AddRefIdToPatient1652904002996';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "refId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD CONSTRAINT "UQ_c988707b88fdc167c51e931a9c1" UNIQUE ("refId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient" DROP CONSTRAINT "UQ_c988707b88fdc167c51e931a9c1"`,
    );
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "refId"`);
  }
}
