import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { vitals } from "src/vitals/vitals.entity";
import { VitalsService } from "./vitals.service";

@Controller()
export class VitalsController{
    constructor(private vitalsService: VitalsService) { }
    
    @Get()
    getAllVitlas(): Promise<vitals[]>{
        return this.vitalsService.getAllVitals();
    }

    @Post()
    create(@Body() vital: vitals) {
        return this.vitalsService.addVital(vital);
    }

    @Get(':id')
    getVital(@Param('id') id: string): Promise<vitals>{
        return this.vitalsService.getVital(Number(id));
    }

    @Put(':id')
    updateVital(@Param('id') id: string, @Body() vital: vitals): Promise<vitals>{
        return this.vitalsService.update(Number(id), vital);
    }

    @Delete(':id')
    deleteVital(@Param('id') id: string){
        return this.vitalsService.delete(Number(id));
    }
}