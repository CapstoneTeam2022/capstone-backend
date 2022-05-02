import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Prescriptions } from "./prescriptions.entity";
import { PrescriptionsService } from "./prescription.service";
import { PrescriptionDto } from "./dto";

@Controller('prescriptions')
export class PrescriptionsController{
    constructor(private  prescriptionService: PrescriptionsService) { }
    
    @Get()
    getAllPrescriptions(): Promise<PrescriptionDto[]>{
        return this.prescriptionService.getAllPrescriptions();
    }

    @Post()
    create(@Body() prescription: PrescriptionDto) {
        return this.prescriptionService.addPrescription(prescription);
    }

    @Get(':id')
    getPrescription(@Param('id') id: string): Promise<PrescriptionDto>{
        return this.prescriptionService.getPrescription(Number(id));
    }

    @Put(':id')
    updatePrescription(@Param('id') id: string, @Body() prescription: PrescriptionDto): Promise<PrescriptionDto>{
        return this.prescriptionService.update(Number(id), prescription)
    }

    @Delete(':id')
    deletePrescription(@Param('id') id: string) {
        return this.prescriptionService.delete(Number(id));
    }
}