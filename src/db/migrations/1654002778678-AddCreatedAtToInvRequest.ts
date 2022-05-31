import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtToInvRequest1654002778678
  implements MigrationInterface
{
  name = 'AddCreatedAtToInvRequest1654002778678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" DROP COLUMN "createdAt"`,
    );
  }
}
