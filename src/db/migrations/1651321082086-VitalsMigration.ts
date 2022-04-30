import { MigrationInterface, QueryRunner } from 'typeorm';

export class VitalsMigration1651321082086 implements MigrationInterface {
  name = 'VitalsMigration1651321082086';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vitals" ("id" SERIAL NOT NULL, "temperature" integer NOT NULL, "pulse" integer NOT NULL, "respiratoryRate" integer NOT NULL, "bloodPressure" integer NOT NULL, "weight" integer NOT NULL, "spo2Level" integer NOT NULL, "heartRate" integer NOT NULL, "requestedDate" TIMESTAMP NOT NULL DEFAULT now(), "filledDate" TIMESTAMP, "patientId" integer, "requestedById" integer, "filledById" integer, CONSTRAINT "PK_a6f02e68a2c1766b720d065dfd8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "vitals" ADD CONSTRAINT "FK_18d995ee0fc66f9ebded708850c" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vitals" ADD CONSTRAINT "FK_0fa80dfa35c839eaffd71050cbf" FOREIGN KEY ("requestedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vitals" ADD CONSTRAINT "FK_945b5e24f6911d0e434ec5a3d6f" FOREIGN KEY ("filledById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vitals" DROP CONSTRAINT "FK_945b5e24f6911d0e434ec5a3d6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vitals" DROP CONSTRAINT "FK_0fa80dfa35c839eaffd71050cbf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vitals" DROP CONSTRAINT "FK_18d995ee0fc66f9ebded708850c"`,
    );
    await queryRunner.query(`DROP TABLE "vitals"`);
  }
}
