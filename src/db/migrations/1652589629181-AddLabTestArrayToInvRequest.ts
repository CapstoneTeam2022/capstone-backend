import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLabTestArrayToInvRequest1652589629181
  implements MigrationInterface
{
  name = 'AddLabTestArrayToInvRequest1652589629181';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" ADD "labTests" integer array NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" DROP COLUMN "labTests"`,
    );
  }
}
