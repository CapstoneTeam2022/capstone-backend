import { MigrationInterface, QueryRunner } from 'typeorm';

export class RadiologyMigration1651572223395 implements MigrationInterface {
  name = 'RadiologyMigration1651572223395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "radiology" ("id" SERIAL NOT NULL, "name" integer NOT NULL, "focalArea" character varying NOT NULL, "orderDate" TIMESTAMP NOT NULL DEFAULT now(), "filledDate" TIMESTAMP, "report" character varying NOT NULL, "images" character varying NOT NULL, "comment" character varying NOT NULL, "requestedById" integer, "investigationRequestId" integer, CONSTRAINT "PK_ad8a5db41b71b6f62a25372ccd8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "radiology" ADD CONSTRAINT "FK_b9c92dbb5be3053bcc12063ae81" FOREIGN KEY ("requestedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "radiology" ADD CONSTRAINT "FK_e19a8e23d1d419192aa8e71eb07" FOREIGN KEY ("investigationRequestId") REFERENCES "investigation_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "radiology" DROP CONSTRAINT "FK_e19a8e23d1d419192aa8e71eb07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "radiology" DROP CONSTRAINT "FK_b9c92dbb5be3053bcc12063ae81"`,
    );
    await queryRunner.query(`DROP TABLE "radiology"`);
  }
}
