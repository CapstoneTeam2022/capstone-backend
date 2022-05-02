import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LabResultService } from "./labResult.service";
import { LabResultController } from "./labResults.controller";
import { LabResult } from "./labResult.entity";
@Module({
    imports: [
        TypeOrmModule.forFeature([LabResult])
    ],
    controllers:[LabResultController],
    providers:[LabResultService]
})

export class LabResultModule{}