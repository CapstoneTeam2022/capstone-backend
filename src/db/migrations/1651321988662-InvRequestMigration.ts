import { MigrationInterface, QueryRunner } from 'typeorm';

export class InvRequestMigration1651321988662 implements MigrationInterface {
  name = 'InvRequestMigration1651321988662';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "investigation_request" ("id" SERIAL NOT NULL, "note" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "vitalsId" integer, "registeredById" integer, CONSTRAINT "PK_5e6b537d86e68c622f808fdc466" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "investigation_request" ADD CONSTRAINT "FK_e4a41b958aa7dd5ca52c84abdff" FOREIGN KEY ("vitalsId") REFERENCES "vitals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investigation_request" ADD CONSTRAINT "FK_d34163724992eef0c7e3e4e33ce" FOREIGN KEY ("registeredById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" DROP CONSTRAINT "FK_d34163724992eef0c7e3e4e33ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investigation_request" DROP CONSTRAINT "FK_e4a41b958aa7dd5ca52c84abdff"`,
    );
    await queryRunner.query(`DROP TABLE "investigation_request"`);
  }
}
