import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHealthCenterToUser1651831547680 implements MigrationInterface {
  name = 'AddHealthCenterToUser1651831547680';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "healthCenterId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_25d94f8d770df6119c6b6f8f392" FOREIGN KEY ("healthCenterId") REFERENCES "health_center"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_25d94f8d770df6119c6b6f8f392"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "healthCenterId"`);
  }
}
