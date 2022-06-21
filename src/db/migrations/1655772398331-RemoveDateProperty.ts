import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDateProperty1655772398331 implements MigrationInterface {
  name = 'RemoveDateProperty1655772398331';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" DROP COLUMN "date"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
