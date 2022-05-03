import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeDateColumnDefaultToCreatedDate1651565157738
  implements MigrationInterface
{
  name = 'MakeDateColumnDefaultToCreatedDate1651565157738';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" ALTER COLUMN "date" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investigation_request" ALTER COLUMN "date" DROP DEFAULT`,
    );
  }
}
