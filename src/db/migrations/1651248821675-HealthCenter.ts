import { MigrationInterface, QueryRunner } from 'typeorm';

export class HealthCenter1651248821675 implements MigrationInterface {
  name = 'HealthCenter1651248821675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "health_center" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "type" character varying NOT NULL, "addressId" integer, CONSTRAINT "REL_17f6f99981dfa724d254fc4a11" UNIQUE ("addressId"), CONSTRAINT "PK_df9e1dae22a04cfddfb51b095ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "health_center" ADD CONSTRAINT "FK_17f6f99981dfa724d254fc4a11d" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "health_center" DROP CONSTRAINT "FK_17f6f99981dfa724d254fc4a11d"`,
    );
    await queryRunner.query(`DROP TABLE "health_center"`);
  }
}
