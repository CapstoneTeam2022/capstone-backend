import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtToHealthCenter1654002342165
  implements MigrationInterface
{
  name = 'AddCreatedAtToHealthCenter1654002342165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "health_center" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "health_center" DROP COLUMN "createdAt"`,
    );
  }
}
