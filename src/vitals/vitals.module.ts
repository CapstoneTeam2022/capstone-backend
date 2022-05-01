import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { vitalsProvider } from "./vitals.provider";
import { VitalsController } from "./vitals.controller";
import { VitalsService } from "./vitals.service";

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [VitalsController],
    providers:[...vitalsProvider, VitalsService]
})
export class vitalsModule{}