import { MigrationInterface, QueryRunner } from 'typeorm';

export class PatientMigration1651319754328 implements MigrationInterface {
  name = 'PatientMigration1651319754328';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patient" ("id" SERIAL NOT NULL, "emergencyContactName" character varying NOT NULL, "emergencyContactPhone" character varying NOT NULL, "userId" integer, "registeredById" integer, CONSTRAINT "REL_6636aefca0bdad8933c7cc3e39" UNIQUE ("userId"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD CONSTRAINT "FK_6636aefca0bdad8933c7cc3e394" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD CONSTRAINT "FK_755eca138d773e19c8dd0a0f3eb" FOREIGN KEY ("registeredById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient" DROP CONSTRAINT "FK_755eca138d773e19c8dd0a0f3eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" DROP CONSTRAINT "FK_6636aefca0bdad8933c7cc3e394"`,
    );
    await queryRunner.query(`DROP TABLE "patient"`);
  }
}
