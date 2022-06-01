import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLabTestToLabResult1654091234088 implements MigrationInterface {
  name = 'AddLabTestToLabResult1654091234088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lab_result" ADD "labTestId" integer`);
    await queryRunner.query(
      `ALTER TABLE "lab_result" ADD CONSTRAINT "FK_1a4757208f5d0cd64a8099e3926" FOREIGN KEY ("labTestId") REFERENCES "lab_test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_result" DROP CONSTRAINT "FK_1a4757208f5d0cd64a8099e3926"`,
    );
    await queryRunner.query(`ALTER TABLE "lab_result" DROP COLUMN "labTestId"`);
  }
}
