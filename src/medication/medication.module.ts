import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MedicationsController } from "./Medication.controller";
import { MedicationsService } from "./medication.service";
import { Medications } from "./medications.entity";
@Module({
    imports: [
        TypeOrmModule.forFeature([Medications])
    ],
    providers: [ MedicationsService],
    controllers:[MedicationsController]
})
export class MedicationModule{}