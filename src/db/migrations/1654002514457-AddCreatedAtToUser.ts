import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtToUser1654002514457 implements MigrationInterface {
  name = 'AddCreatedAtToUser1654002514457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
  }
}
