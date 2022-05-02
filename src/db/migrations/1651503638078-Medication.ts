import {MigrationInterface, QueryRunner} from "typeorm";

export class Medication1651503638078 implements MigrationInterface {
    name = 'Medication1651503638078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medications" ("id" SERIAL NOT NULL, "medication" character varying NOT NULL, CONSTRAINT "PK_cdee49fe7cd79db13340150d356" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "medications"`);
    }

}
