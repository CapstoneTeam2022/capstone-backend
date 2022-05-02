import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PrescriptionsController } from "./prescription.controller";
import { PrescriptionsService } from "./prescription.service";
import { Prescriptions } from "./prescriptions.entity";
@Module({
    imports: [
        TypeOrmModule.forFeature([Prescriptions])
    ],
    providers: [ PrescriptionsService],
    controllers:[PrescriptionsController]
})
export class PrescriptionModule{}