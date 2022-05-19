import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixExamination1652954140853 implements MigrationInterface {
  name = 'FixExamination1652954140853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "examination" RENAME COLUMN "date_time" TO "requestedDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "examination" DROP COLUMN "requestedDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "examination" ADD "requestedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "examination" DROP COLUMN "requestedDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "examination" ADD "requestedDate" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "examination" RENAME COLUMN "requestedDate" TO "date_time"`,
    );
  }
}
