import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateDiagnosisTable1652887424886 implements MigrationInterface {
  name = 'GenerateDiagnosisTable1652887424886';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "diagnosis" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "measuredIn" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "filledById" integer, "investigationRequestId" integer, CONSTRAINT "PK_d5dbb1cc4e30790df368da56961" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "diagnosis" ADD CONSTRAINT "FK_4b77bcd7310e7333674ce3fe1e6" FOREIGN KEY ("filledById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "diagnosis" ADD CONSTRAINT "FK_5976824a15b77c029361717a1f5" FOREIGN KEY ("investigationRequestId") REFERENCES "investigation_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "diagnosis" DROP CONSTRAINT "FK_5976824a15b77c029361717a1f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "diagnosis" DROP CONSTRAINT "FK_4b77bcd7310e7333674ce3fe1e6"`,
    );
    await queryRunner.query(`DROP TABLE "diagnosis"`);
  }
}
