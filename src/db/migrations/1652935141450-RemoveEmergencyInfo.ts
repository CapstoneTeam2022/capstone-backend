import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveEmergencyInfo1652935141450 implements MigrationInterface {
  name = 'RemoveEmergencyInfo1652935141450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "moh_employee" DROP COLUMN "emergencyContactName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "moh_employee" DROP COLUMN "emergencyContactPhone"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "moh_employee" ADD "emergencyContactPhone" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "moh_employee" ADD "emergencyContactName" character varying NOT NULL`,
    );
  }
}
