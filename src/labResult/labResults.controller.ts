import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { LabResult } from "./labResult.entity";
import { LabResultService } from "./labResult.service";
import { LabResultDto } from "./dto";

@Controller('lab-result')
    
export class LabResultController{
    constructor(private labresultService: LabResultService) { }
    
    @Get()
    getAllLabResults(): Promise<LabResultDto[]>{
        return this.labresultService.getAllLabResults();
    }

    @Post()
    create(@Body() labResult: LabResultDto) {
        return this.labresultService.addLabResult(labResult);
    }

    @Get(':id')
    getLabResult(@Param('id') id: string): Promise<LabResultDto>{
        return this.labresultService.getLabResult(Number(id));
    }

    @Put(':id')
    updateLabResult(@Param('id') id: string,@Body() labResult: LabResultDto): Promise<LabResultDto>{
        return this.labresultService.update(Number(id), labResult);
    }

    @Delete(':id')
    deleteLabResult(@Param('id') id: string) {
        return this.labresultService.delete(Number(id));
    }
}