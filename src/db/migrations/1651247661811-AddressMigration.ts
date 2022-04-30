import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddressMigration1651247661811 implements MigrationInterface {
  name = 'AddressMigration1651247661811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "city" character varying NOT NULL, "subCity" character varying NOT NULL, "zone" character varying NOT NULL, "woreda" character varying NOT NULL, "kebelle" character varying NOT NULL, "street" character varying NOT NULL, "houseNo" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
