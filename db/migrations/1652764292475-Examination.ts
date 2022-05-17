import {MigrationInterface, QueryRunner} from "typeorm";

export class Examination1652764292475 implements MigrationInterface {
    name = 'Examination1652764292475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "examination" ("id" SERIAL NOT NULL, "symptom" character varying NOT NULL, "physical_examination" character varying NOT NULL, "date_time" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_de7c2a81d379fdf37174356fc12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "healthCenterId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_25d94f8d770df6119c6b6f8f392" FOREIGN KEY ("healthCenterId") REFERENCES "health_center"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_25d94f8d770df6119c6b6f8f392"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "healthCenterId"`);
        await queryRunner.query(`DROP TABLE "examination"`);
    }

}
