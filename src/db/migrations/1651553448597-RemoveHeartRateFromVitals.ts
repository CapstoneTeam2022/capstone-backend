import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveHeartRateFromVitals1651553448597
  implements MigrationInterface
{
  name = 'RemoveHeartRateFromVitals1651553448597';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vitals" DROP COLUMN "heartRate"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vitals" ADD "heartRate" integer NOT NULL`,
    );
  }
}
