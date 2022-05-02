import { Module } from "@nestjs/common";
import { Vitals } from './vitals.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { VitalsController } from "./vitals.controller";
import { VitalsService } from "./vitals.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Vitals]),
    ],
    controllers: [VitalsController],
    providers:[VitalsService]
})
export class VitalsModule{}