import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFilledByToLabResult1651570205849 implements MigrationInterface {
  name = 'AddFilledByToLabResult1651570205849';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_result" ADD "filledById" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_result" ADD CONSTRAINT "FK_54979ca679af314ec2a5bd1cdb1" FOREIGN KEY ("filledById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_result" DROP CONSTRAINT "FK_54979ca679af314ec2a5bd1cdb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_result" DROP COLUMN "filledById"`,
    );
  }
}
