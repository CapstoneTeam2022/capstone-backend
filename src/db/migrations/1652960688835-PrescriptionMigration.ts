import { MigrationInterface, QueryRunner } from 'typeorm';

export class PrescriptionMigration1652960688835 implements MigrationInterface {
  name = 'PrescriptionMigration1652960688835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "prescription" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "medications" text array NOT NULL, "diagnosisId" integer, CONSTRAINT "PK_eaba5e4414e5382781e08467b51" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "FK_292c032cb489c89b36feffcfd62" FOREIGN KEY ("diagnosisId") REFERENCES "diagnosis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "FK_292c032cb489c89b36feffcfd62"`,
    );
    await queryRunner.query(`DROP TABLE "prescription"`);
  }
}
