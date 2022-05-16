import { MigrationInterface, QueryRunner } from 'typeorm';

export class HealthCenterEmailUnique1651254468694
  implements MigrationInterface
{
  name = 'HealthCenterEmailUnique1651254468694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "health_center" ADD CONSTRAINT "UQ_df8e22d5237e1f32bab47165028" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "health_center" DROP CONSTRAINT "UQ_df8e22d5237e1f32bab47165028"`,
    );
  }
}
