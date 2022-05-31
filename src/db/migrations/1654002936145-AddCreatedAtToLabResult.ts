import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtToLabResult1654002936145
  implements MigrationInterface
{
  name = 'AddCreatedAtToLabResult1654002936145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_result" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lab_result" DROP COLUMN "createdAt"`);
  }
}
