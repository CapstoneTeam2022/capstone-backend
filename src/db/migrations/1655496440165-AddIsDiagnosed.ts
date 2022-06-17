import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsDiagnosed1655496440165 implements MigrationInterface {
  name = 'AddIsDiagnosed1655496440165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" ADD "isDiagnosed" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" DROP COLUMN "isDiagnosed"`,
    );
  }
}
