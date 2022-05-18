import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGenderToUser1652904084461 implements MigrationInterface {
  name = 'AddGenderToUser1652904084461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "gender" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
  }
}
