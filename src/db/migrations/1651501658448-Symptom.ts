import {MigrationInterface, QueryRunner} from "typeorm";

export class Symptom1651501658448 implements MigrationInterface {
    name = 'Symptom1651501658448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "symptoms" ("id" SERIAL NOT NULL, "vitalId" integer NOT NULL, "symptoms" character varying NOT NULL, "physicalExaminations" character varying NOT NULL, CONSTRAINT "PK_7041f6c8f7afb75b9286c275a81" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "symptoms"`);
    }

}
