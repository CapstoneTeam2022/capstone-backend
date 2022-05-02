import { Injectable, NotFoundException } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository, DeleteResult } from "typeorm";
import { Symptoms } from "./symptoms.entity";
import { SymptomsDto } from "./dto";
@Injectable()
export class SymptomsService{
    constructor(
        @InjectRepository(Symptoms)
        private symptomRepository: Repository<Symptoms>
    ) { }
    
    async getAllSymptoms(): Promise<SymptomsDto[]>{
    return await this.symptomRepository.find();
    }
   
    async addSymptom(symptom: SymptomsDto): Promise<InsertResult>{
        return await this.symptomRepository.insert(symptom);
    }

    async getSymptom(id: number): Promise<SymptomsDto>{
        return await this.symptomRepository.findOne({
            where: {
                id,
            },
        });
    }

    async update(id: number, symptom: SymptomsDto): Promise<SymptomsDto>{
        const symptomUpdate = await this.getSymptom(id);
        if (symptomUpdate === undefined) {
            throw new NotFoundException();
        }
        await this.symptomRepository.update(id, symptom);
        return this.getSymptom(id);
    }

    async delete(id: number): Promise<DeleteResult>{
        const symptomUpdate = await this.getSymptom(id);
        if (symptomUpdate === undefined) {
            throw new NotFoundException();
        }
        return this.symptomRepository.delete(id);
    }
}