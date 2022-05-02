import { Injectable, NotFoundException } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository, DeleteResult } from "typeorm";
import { Prescriptions } from "./prescriptions.entity";
import { PrescriptionDto } from "./dto";
@Injectable()
export class PrescriptionsService{
    constructor(
        @InjectRepository(Prescriptions)
        private prescriptionRepository: Repository<Prescriptions>
    ) { }
    
    async getAllPrescriptions(): Promise<PrescriptionDto[]>{
    return await this.prescriptionRepository.find();
    }
   
    async addPrescription(prescription: PrescriptionDto): Promise<InsertResult>{
        return await this.prescriptionRepository.insert(prescription);
    }

    async getPrescription(id: number): Promise<PrescriptionDto>{
        return await this.prescriptionRepository.findOne({
            where: {
                id,
            },
        });
    }

    async update(id: number, prescription: PrescriptionDto): Promise<PrescriptionDto>{
        const prescriptionUpdate = await this.getPrescription(id);
        if (prescriptionUpdate === undefined) {
            throw new NotFoundException();
        }
        await this.prescriptionRepository.update(id, prescription);
        return this.getPrescription(id);
    }

    async delete(id: number): Promise<DeleteResult>{
        const prescriptionUpdate = await this.getPrescription(id);
        if (prescriptionUpdate === undefined) {
            throw new NotFoundException();
        }
        return this.prescriptionRepository.delete(id);
    }
}