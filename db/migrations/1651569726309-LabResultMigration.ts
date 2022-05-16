import { MigrationInterface, QueryRunner } from 'typeorm';

export class LabResultMigration1651569726309 implements MigrationInterface {
  name = 'LabResultMigration1651569726309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lab_result" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "filledDate" TIMESTAMP NOT NULL DEFAULT now(), "result" character varying NOT NULL, "isAbnormal" boolean NOT NULL, "comment" character varying NOT NULL, "investigationRequestId" integer, CONSTRAINT "PK_f681a13fc5b637444500261a0e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_result" ADD CONSTRAINT "FK_55fc0a53dbd6072fea4b68cbeeb" FOREIGN KEY ("investigationRequestId") REFERENCES "investigation_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_result" DROP CONSTRAINT "FK_55fc0a53dbd6072fea4b68cbeeb"`,
    );
    await queryRunner.query(`DROP TABLE "lab_result"`);
  }
}
