import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveMeasuredIn1652953359603 implements MigrationInterface {
  name = 'RemoveMeasuredIn1652953359603';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "diagnosis" DROP COLUMN "measuredIn"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "diagnosis" ADD "measuredIn" character varying NOT NULL`,
    );
  }
}
