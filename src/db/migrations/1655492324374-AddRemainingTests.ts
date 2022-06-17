import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRemainingTests1655492324374 implements MigrationInterface {
  name = 'AddRemainingTests1655492324374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" ADD "remainingTests" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" DROP COLUMN "remainingTests"`,
    );
  }
}
