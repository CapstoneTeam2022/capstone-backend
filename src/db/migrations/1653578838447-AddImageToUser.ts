import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageToUser1653578838447 implements MigrationInterface {
  name = 'AddImageToUser1653578838447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "image" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
  }
}
