import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseMigration1651497079766 implements MigrationInterface {
  name = 'BaseMigration1651497079766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lab_test" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "normalRange" character varying NOT NULL, "measuredIn" character varying NOT NULL, "testCategory" character varying NOT NULL, "investigationRequestId" integer, CONSTRAINT "PK_17ece4e9d3e00bc2fa6c57d9339" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "diagnosis" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "measuredIn" character varying NOT NULL, "disease" character varying NOT NULL, "filledById" integer, "investigationRequestId" integer, CONSTRAINT "PK_d5dbb1cc4e30790df368da56961" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "disease" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_f7a8573a47cdc044735eda4644b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "health_center" DROP COLUMN "isActive"`,
    );
    await queryRunner.query(`ALTER TABLE "vitals" DROP COLUMN "heartRate"`);
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "UQ_ae4578dcaed5adff96595e61660"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_test" ADD CONSTRAINT "FK_29bb94ccc1de4b3f53cee54ed06" FOREIGN KEY ("investigationRequestId") REFERENCES "investigation_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "lab_test" DROP CONSTRAINT "FK_29bb94ccc1de4b3f53cee54ed06"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isAdmin" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "vitals" ADD "heartRate" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "health_center" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(`DROP TABLE "disease"`);
    await queryRunner.query(`DROP TABLE "diagnosis"`);
    await queryRunner.query(`DROP TABLE "lab_test"`);
  }
}
