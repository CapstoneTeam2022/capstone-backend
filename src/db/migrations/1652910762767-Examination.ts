import { MigrationInterface, QueryRunner } from 'typeorm';

export class Examination1652910762767 implements MigrationInterface {
  name = 'Examination1652910762767';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "examination" ("id" SERIAL NOT NULL, "symptom" character varying NOT NULL, "physical_examination" character varying NOT NULL, "date_time" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_de7c2a81d379fdf37174356fc12" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "examination"`);
  }
}
