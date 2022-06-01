import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeAddressColumnsOptional1654086440309
  implements MigrationInterface
{
  name = 'MakeAddressColumnsOptional1654086440309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "zone" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "woreda" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "kebelle" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "street" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "houseNo" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "houseNo" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "street" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "kebelle" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "woreda" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "zone" SET NOT NULL`,
    );
  }
}
