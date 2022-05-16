import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImagesArrayDefault1651573136021 implements MigrationInterface {
  name = 'AddImagesArrayDefault1651573136021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "radiology" ALTER COLUMN "images" SET DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "radiology" ALTER COLUMN "images" DROP DEFAULT`,
    );
  }
}
