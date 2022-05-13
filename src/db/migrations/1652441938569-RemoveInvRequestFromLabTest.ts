import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveInvRequestFromLabTest1652441938569
  implements MigrationInterface
{
  name = 'RemoveInvRequestFromLabTest1652441938569';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_test" DROP CONSTRAINT "FK_29bb94ccc1de4b3f53cee54ed06"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_test" DROP COLUMN "investigationRequestId"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_test" ADD "investigationRequestId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_test" ADD CONSTRAINT "FK_29bb94ccc1de4b3f53cee54ed06" FOREIGN KEY ("investigationRequestId") REFERENCES "investigation_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
