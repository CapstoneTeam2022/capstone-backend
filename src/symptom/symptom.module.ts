import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SyptomsController } from "./symptom.controller";
import { SymptomsService } from "./symptom.service";
import { Symptoms } from "./symptoms.entity";
@Module({
    imports: [
      TypeOrmModule.forFeature([Symptoms])  
    ],
    providers: [SymptomsService],
    controllers:[SyptomsController]
})
export class symptomModule{}