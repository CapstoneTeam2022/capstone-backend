import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReplaceRequestedBy1655841156868 implements MigrationInterface {
  name = 'ReplaceRequestedBy1655841156868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "radiology" DROP CONSTRAINT "FK_b9c92dbb5be3053bcc12063ae81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "radiology" RENAME COLUMN "requestedById" TO "filledById"`,
    );
    await queryRunner.query(
      `ALTER TABLE "radiology" ADD CONSTRAINT "FK_fa2df8423f6a86dcef51f937df4" FOREIGN KEY ("filledById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "radiology" DROP CONSTRAINT "FK_fa2df8423f6a86dcef51f937df4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "radiology" RENAME COLUMN "filledById" TO "requestedById"`,
    );
    await queryRunner.query(
      `ALTER TABLE "radiology" ADD CONSTRAINT "FK_b9c92dbb5be3053bcc12063ae81" FOREIGN KEY ("requestedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
