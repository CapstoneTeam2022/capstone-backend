import {MigrationInterface, QueryRunner} from "typeorm";

export class Prescription1651505522794 implements MigrationInterface {
    name = 'Prescription1651505522794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prescriptions" ("id" SERIAL NOT NULL, "medication" character varying NOT NULL, CONSTRAINT "PK_097b2cc2f2b7e56825468188503" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "prescriptions"`);
    }

}
