import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLabTestInvRequestRelation1652952394463
  implements MigrationInterface
{
  name = 'AddLabTestInvRequestRelation1652952394463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "InvRequestLabTest" ("investigationRequestId" integer NOT NULL, "labTestId" integer NOT NULL, CONSTRAINT "PK_868acbd502927af4bc5236c673e" PRIMARY KEY ("investigationRequestId", "labTestId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_82c38d85da20a0cbf0458d9b0e" ON "InvRequestLabTest" ("investigationRequestId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1b8ad80053cc796c217a22fa96" ON "InvRequestLabTest" ("labTestId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "investigation_request" DROP COLUMN "labTests"`,
    );
    await queryRunner.query(
      `ALTER TABLE "InvRequestLabTest" ADD CONSTRAINT "FK_82c38d85da20a0cbf0458d9b0e9" FOREIGN KEY ("investigationRequestId") REFERENCES "investigation_request"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "InvRequestLabTest" ADD CONSTRAINT "FK_1b8ad80053cc796c217a22fa960" FOREIGN KEY ("labTestId") REFERENCES "lab_test"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "InvRequestLabTest" DROP CONSTRAINT "FK_1b8ad80053cc796c217a22fa960"`,
    );
    await queryRunner.query(
      `ALTER TABLE "InvRequestLabTest" DROP CONSTRAINT "FK_82c38d85da20a0cbf0458d9b0e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investigation_request" ADD "labTests" integer array NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1b8ad80053cc796c217a22fa96"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_82c38d85da20a0cbf0458d9b0e"`,
    );
    await queryRunner.query(`DROP TABLE "InvRequestLabTest"`);
  }
}
