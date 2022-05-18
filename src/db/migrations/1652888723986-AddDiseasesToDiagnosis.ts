import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDiseasesToDiagnosis1652888723986 implements MigrationInterface {
  name = 'AddDiseasesToDiagnosis1652888723986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "DiagnosisDisease" ("diagnosisId" integer NOT NULL, "diseaseId" integer NOT NULL, CONSTRAINT "PK_9e59a53582d8a109df15e107fb3" PRIMARY KEY ("diagnosisId", "diseaseId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_91faecb50dad9ba3c8b7944021" ON "DiagnosisDisease" ("diagnosisId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58a21d0d1d49b6a8747e626305" ON "DiagnosisDisease" ("diseaseId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "DiagnosisDisease" ADD CONSTRAINT "FK_91faecb50dad9ba3c8b79440216" FOREIGN KEY ("diagnosisId") REFERENCES "diagnosis"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "DiagnosisDisease" ADD CONSTRAINT "FK_58a21d0d1d49b6a8747e626305c" FOREIGN KEY ("diseaseId") REFERENCES "disease"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "DiagnosisDisease" DROP CONSTRAINT "FK_58a21d0d1d49b6a8747e626305c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "DiagnosisDisease" DROP CONSTRAINT "FK_91faecb50dad9ba3c8b79440216"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58a21d0d1d49b6a8747e626305"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_91faecb50dad9ba3c8b7944021"`,
    );
    await queryRunner.query(`DROP TABLE "DiagnosisDisease"`);
  }
}
