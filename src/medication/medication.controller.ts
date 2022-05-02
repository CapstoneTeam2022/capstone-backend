import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Medications } from "./medications.entity";
import { MedicationsService } from "./medication.service";
import { MedicationDto } from "./dto";

@Controller('medications')
export class MedicationsController{
    constructor(private  medicationService: MedicationsService) { }
    
    @Get()
    getAllMedications(): Promise<MedicationDto[]>{
        return this.medicationService.getAllMedications();
    }

    @Post()
    create(@Body() medication: MedicationDto) {
        return this.medicationService.addMedication(medication);
    }

    @Get(':id')
    getMedication(@Param('id') id: string): Promise<MedicationDto>{
        return this.medicationService.getMedication(Number(id));
    }

    @Put(':id')
    updateMedication(@Param('id') id: string, @Body() medication: MedicationDto): Promise<MedicationDto>{
        return this.medicationService.update(Number(id), medication)
    }

    @Delete(':id')
    deleteMedication(@Param('id') id: string) {
        return this.medicationService.delete(Number(id));
    }
}