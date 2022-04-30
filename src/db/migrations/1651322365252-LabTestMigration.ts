import { MigrationInterface, QueryRunner } from 'typeorm';

export class LabTestMigration1651322365252 implements MigrationInterface {
  name = 'LabTestMigration1651322365252';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lab_test" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "normalRange" character varying NOT NULL, "measuredIn" character varying NOT NULL, "testCategory" character varying NOT NULL, "investigationRequestId" integer, CONSTRAINT "PK_17ece4e9d3e00bc2fa6c57d9339" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_test" ADD CONSTRAINT "FK_29bb94ccc1de4b3f53cee54ed06" FOREIGN KEY ("investigationRequestId") REFERENCES "investigation_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_test" DROP CONSTRAINT "FK_29bb94ccc1de4b3f53cee54ed06"`,
    );
    await queryRunner.query(`DROP TABLE "lab_test"`);
  }
}
