import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordReset1655412865071 implements MigrationInterface {
  name = 'AddPasswordReset1655412865071';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isPasswordReset" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isPasswordReset"`);
  }
}
