import {MigrationInterface, QueryRunner} from "typeorm";

export class DiagnosisMigration1652785694191 implements MigrationInterface {
    name = 'DiagnosisMigration1652785694191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lab_result" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "filledDate" TIMESTAMP NOT NULL DEFAULT now(), "result" character varying NOT NULL, "isAbnormal" boolean NOT NULL, "comment" character varying NOT NULL, "investigationRequestId" integer, "filledById" integer, CONSTRAINT "PK_f681a13fc5b637444500261a0e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "health_center" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "diagnosis" DROP COLUMN "disease"`);
        await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "focalarea"`);
        await queryRunner.query(`ALTER TABLE "vitals" DROP COLUMN "heartRate"`);
        await queryRunner.query(`ALTER TABLE "disease" ADD "diagnosisId" integer`);
        await queryRunner.query(`ALTER TABLE "radiology" ADD "focalArea" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "radiology" ADD "comment" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "radiology" ADD "requestedById" integer`);
        await queryRunner.query(`ALTER TABLE "radiology" ADD "investigationRequestId" integer`);
        await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "radiology" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "radiology" ALTER COLUMN "orderDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "radiology" ALTER COLUMN "filledDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "radiology" ADD "images" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "investigation_request" ALTER COLUMN "date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "disease" ADD CONSTRAINT "FK_b812cbd36b38f749058bacc8301" FOREIGN KEY ("diagnosisId") REFERENCES "diagnosis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lab_result" ADD CONSTRAINT "FK_55fc0a53dbd6072fea4b68cbeeb" FOREIGN KEY ("investigationRequestId") REFERENCES "investigation_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lab_result" ADD CONSTRAINT "FK_54979ca679af314ec2a5bd1cdb1" FOREIGN KEY ("filledById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "radiology" ADD CONSTRAINT "FK_b9c92dbb5be3053bcc12063ae81" FOREIGN KEY ("requestedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "radiology" ADD CONSTRAINT "FK_e19a8e23d1d419192aa8e71eb07" FOREIGN KEY ("investigationRequestId") REFERENCES "investigation_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "radiology" DROP CONSTRAINT "FK_e19a8e23d1d419192aa8e71eb07"`);
        await queryRunner.query(`ALTER TABLE "radiology" DROP CONSTRAINT "FK_b9c92dbb5be3053bcc12063ae81"`);
        await queryRunner.query(`ALTER TABLE "lab_result" DROP CONSTRAINT "FK_54979ca679af314ec2a5bd1cdb1"`);
        await queryRunner.query(`ALTER TABLE "lab_result" DROP CONSTRAINT "FK_55fc0a53dbd6072fea4b68cbeeb"`);
        await queryRunner.query(`ALTER TABLE "disease" DROP CONSTRAINT "FK_b812cbd36b38f749058bacc8301"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isAdmin" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "investigation_request" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "radiology" ADD "images" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "radiology" ALTER COLUMN "filledDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "radiology" ALTER COLUMN "orderDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "radiology" ADD "name" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "investigationRequestId"`);
        await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "requestedById"`);
        await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "radiology" DROP COLUMN "focalArea"`);
        await queryRunner.query(`ALTER TABLE "disease" DROP COLUMN "diagnosisId"`);
        await queryRunner.query(`ALTER TABLE "vitals" ADD "heartRate" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "radiology" ADD "focalarea" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "diagnosis" ADD "disease" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "health_center" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`DROP TABLE "lab_result"`);
    }

}
