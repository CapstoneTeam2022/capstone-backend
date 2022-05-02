import {MigrationInterface, QueryRunner} from "typeorm";

export class LabResult1651497097621 implements MigrationInterface {
    name = 'LabResult1651497097621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lab_result" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL,  "FilledDate" character varying NOT NULL, "FilledBy" character varying NOT NULL, "result" character varying NOT NULL, "measuredIn" character varying NOT NULL, "normalRangeFrom" character varying NOT NULL,"normalRangeTo" character varying NOT NULL, "isAbnormal" boolean NOT NULL, "comment" character varying NOT NULL, CONSTRAINT "PK_f681a13fc5b637444500261a0e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lab_result"`);
    }

}
