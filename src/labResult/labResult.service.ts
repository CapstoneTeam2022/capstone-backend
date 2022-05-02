import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { LabResult } from "./labResult.entity";
import { InsertResult, Repository, DeleteResult } from "typeorm";
import { LabResultDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()

export class LabResultService{
 
    constructor(
    @InjectRepository(LabResult)
    private labResultRepository: Repository<LabResult>
    ) { }
    
    async getAllLabResults(): Promise<LabResultDto[]>{
        return await this.labResultRepository.find();
    }

    async addLabResult(labResult: LabResultDto): Promise<InsertResult>{
        return await this.labResultRepository.insert(labResult);
    }

    async getLabResult(id: number): Promise<LabResult>{
        return this.labResultRepository.findOne({
            where: {
                id,
            },
        })
    }
   
    async update(id: number, labResult: LabResultDto): Promise<LabResultDto>{
        const labResultUpdate = await this.getLabResult(id);
        if (labResultUpdate === undefined) {
            throw new NotFoundException();
        }
        await this.labResultRepository.update(id, labResult);
        return this.getLabResult(id);
    }

    async delete(id: number): Promise<DeleteResult>{
         const labResultUpdate = await this.getLabResult(id);
        if (labResultUpdate === undefined) {
            throw new NotFoundException();
        }
        return this.labResultRepository.delete(id);
    }
}