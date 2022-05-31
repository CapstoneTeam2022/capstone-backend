import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtToRadiology1654003198471
  implements MigrationInterface
{
  name = 'AddCreatedAtToRadiology1654003198471';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "radiology" RENAME COLUMN "orderDate" TO "createdAt"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "radiology" RENAME COLUMN "createdAt" TO "orderDate"`,
    );
  }
}
