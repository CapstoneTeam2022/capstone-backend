import { MigrationInterface, QueryRunner } from 'typeorm';

export class MedicationEntity1653151071176 implements MigrationInterface {
  name = 'MedicationEntity1653151071176';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "medication" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dosage" character varying NOT NULL, "instructions" character varying NOT NULL, "prescriptionId" integer, CONSTRAINT "PK_0682f5b7379fea3c2fdb77d6545" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "medication" ADD CONSTRAINT "FK_13fba2f48843ee8993100743a83" FOREIGN KEY ("prescriptionId") REFERENCES "prescription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medication" DROP CONSTRAINT "FK_13fba2f48843ee8993100743a83"`,
    );
    await queryRunner.query(`DROP TABLE "medication"`);
  }
}
