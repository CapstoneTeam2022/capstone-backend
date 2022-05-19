import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVitalsToExamination1652954284636 implements MigrationInterface {
  name = 'AddVitalsToExamination1652954284636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "examination" ADD "vitalId" integer`);
    await queryRunner.query(
      `ALTER TABLE "examination" ADD CONSTRAINT "UQ_d23b2ff052636513c20aa41d2fa" UNIQUE ("vitalId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "examination" ADD CONSTRAINT "FK_d23b2ff052636513c20aa41d2fa" FOREIGN KEY ("vitalId") REFERENCES "vitals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "examination" DROP CONSTRAINT "FK_d23b2ff052636513c20aa41d2fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "examination" DROP CONSTRAINT "UQ_d23b2ff052636513c20aa41d2fa"`,
    );
    await queryRunner.query(`ALTER TABLE "examination" DROP COLUMN "vitalId"`);
  }
}
