import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateDiseaseTable1652888087076 implements MigrationInterface {
  name = 'GenerateDiseaseTable1652888087076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "disease" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_f7a8573a47cdc044735eda4644b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "disease"`);
  }
}
