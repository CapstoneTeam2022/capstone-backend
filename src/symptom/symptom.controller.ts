import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Symptoms } from "./symptoms.entity";
import { SymptomsService } from "./symptom.service";
import { SymptomsDto } from "./dto";

@Controller('symptoms')
export class SyptomsController{
    constructor(private symptomService: SymptomsService) { }
    
    @Get()
    getAllSymptoms(): Promise<SymptomsDto[]>{
        return this.symptomService.getAllSymptoms();
    }

    @Post()
    create(@Body() symptom: SymptomsDto) {
        return this.symptomService.addSymptom(symptom);
    }

    @Get(':id')
    getSymptom(@Param('id') id: string): Promise<SymptomsDto>{
        return this.symptomService.getSymptom(Number(id));
    }

    @Put(':id')
    updateSymptom(@Param('id') id: string, @Body() symptom: SymptomsDto): Promise<SymptomsDto>{
        return this.symptomService.update(Number(id), symptom)
    }

    @Delete(':id')
    deleteSymptom(@Param('id') id: string) {
        return this.symptomService.delete(Number(id));
    }
}