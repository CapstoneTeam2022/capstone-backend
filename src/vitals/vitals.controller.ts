import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { VitalsDto } from "./dto";
import { VitalsService } from "./vitals.service";
import { Vitals } from "./vitals.entity";
@Controller('vitals')
export class VitalsController{
    constructor(private readonly vitalsService: VitalsService) { }
    
    @Get()
    getAllVitlas(){
        return this.vitalsService.getAllVitals();
    }

    @Post()
    create(@Body() vitals: VitalsDto) {
        return this.vitalsService.addVital(vitals);
    }

    @Get(':id')
    getVital(@Param('id') id: string){
        return this.vitalsService.getVital(Number(id));
    }

    @Put(':id')
    updateVital(@Param('id') id: string, @Body() vital: VitalsDto): Promise<VitalsDto>{
        return this.vitalsService.update(Number(id), vital);
    }

    @Delete(':id')
    deleteVital(@Param('id') id: string){
        return this.vitalsService.delete(Number(id));
    }
}