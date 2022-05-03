import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeIsActiveDefaultTrue1651515320066
  implements MigrationInterface
{
  name = 'MakeIsActiveDefaultTrue1651515320066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isActive" DROP DEFAULT`,
    );
  }
}
