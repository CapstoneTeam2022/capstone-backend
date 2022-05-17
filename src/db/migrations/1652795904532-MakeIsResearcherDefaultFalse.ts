import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeIsResearcherDefaultFalse1652795904532
  implements MigrationInterface
{
  name = 'MakeIsResearcherDefaultFalse1652795904532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isResearcher" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isResearcher" DROP DEFAULT`,
    );
  }
}
