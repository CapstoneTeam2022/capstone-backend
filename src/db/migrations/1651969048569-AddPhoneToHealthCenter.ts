import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPhoneToHealthCenter1651969048569 implements MigrationInterface {
  name = 'AddPhoneToHealthCenter1651969048569';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "health_center" ADD "phone" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "health_center" DROP COLUMN "phone"`);
  }
}
