import { Injectable, NotFoundException } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository, DeleteResult } from "typeorm";
import { Medications } from "./medications.entity";
import { MedicationDto } from "./dto";
@Injectable()
export class MedicationsService{
    constructor(
        @InjectRepository(Medications)
        private medicationRepository: Repository<Medications>
    ) { }
    
    async getAllMedications(): Promise<MedicationDto[]>{
    return await this.medicationRepository.find();
    }
   
    async addMedication(medication: MedicationDto): Promise<InsertResult>{
        return await this.medicationRepository.insert(medication);
    }

    async getMedication(id: number): Promise<MedicationDto>{
        return await this.medicationRepository.findOne({
            where: {
                id,
            },
        });
    }

    async update(id: number, medication: MedicationDto): Promise<MedicationDto>{
        const medicationUpdate = await this.getMedication(id);
        if (medicationUpdate === undefined) {
            throw new NotFoundException();
        }
        await this.medicationRepository.update(id, medication);
        return this.getMedication(id);
    }

    async delete(id: number): Promise<DeleteResult>{
        const medicationUpdate = await this.getMedication(id);
        if (medicationUpdate === undefined) {
            throw new NotFoundException();
        }
        return this.medicationRepository.delete(id);
    }
}