import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveCommentAndMedicationsFromPrescription1653150778601
  implements MigrationInterface
{
  name = 'RemoveCommentAndMedicationsFromPrescription1653150778601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "prescription" DROP COLUMN "comment"`);
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP COLUMN "medications"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD "medications" text array NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD "comment" character varying NOT NULL`,
    );
  }
}
