import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMohEmployee1652784505981 implements MigrationInterface {
  name = 'AddMohEmployee1652784505981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "moh_employee" ("id" SERIAL NOT NULL, "emergencyContactName" character varying NOT NULL, "emergencyContactPhone" character varying NOT NULL, "userId" integer, "registeredById" integer, CONSTRAINT "REL_4087b53e52aba6727b043c6885" UNIQUE ("userId"), CONSTRAINT "PK_5cd6f8831cc2ee8d22d8b16c565" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "moh_employee" ADD CONSTRAINT "FK_4087b53e52aba6727b043c68857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "moh_employee" ADD CONSTRAINT "FK_23c9733dbb2a4707a706dd81c38" FOREIGN KEY ("registeredById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "moh_employee" DROP CONSTRAINT "FK_23c9733dbb2a4707a706dd81c38"`,
    );
    await queryRunner.query(
      `ALTER TABLE "moh_employee" DROP CONSTRAINT "FK_4087b53e52aba6727b043c68857"`,
    );
    await queryRunner.query(`DROP TABLE "moh_employee"`);
  }
}
