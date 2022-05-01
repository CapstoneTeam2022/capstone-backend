import { HttpException, Inject,Injectable, NotFoundException, HttpStatus } from "@nestjs/common";
import { vitals } from "src/vitals/vitals.entity";
import { Repository, InsertResult, DeleteResult } from "typeorm";

@Injectable()
export class VitalsService{

    constructor(
        @Inject('VITALS_REPOSITORY')
        private vitalsRepository: Repository<vitals>
    ) { }
    
    async getAllVitals(): Promise<vitals[]> {
        return await  this.vitalsRepository.find();
    }

    async addVital(vitals: vitals): Promise<InsertResult>{
        return await this.vitalsRepository.insert(vitals);
    }

    async getVital(id: number): Promise<vitals>{
        return this.vitalsRepository.findOne({
            where: {
                id,
            },
        });
    }

    

    async update(id: number, vital: vitals): Promise<vitals>{
        const vitaltoUpdate = await this.getVital(id);
        if (vitaltoUpdate === undefined) {
            throw new NotFoundException();
        }
        await this.vitalsRepository.update(id, vital);
        return this.getVital(id);
    }

    async delete(id: number): Promise<DeleteResult>{
        const vitaltoUpdate = await this.getVital(id);
        if (vitaltoUpdate === undefined) {
            throw new NotFoundException();
        }
        return  this.vitalsRepository.delete(id);
        
    }
}