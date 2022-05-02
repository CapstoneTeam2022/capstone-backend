import { HttpException, Inject,Injectable, NotFoundException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Vitals } from "./vitals.entity";
import { VitalsDto } from "./dto";
import { Repository, InsertResult, DeleteResult } from "typeorm";

@Injectable()
export class VitalsService{

    constructor(
        @InjectRepository(Vitals)
        private vitalsRepository: Repository<Vitals>
    ) { }
    
    async getAllVitals(): Promise<VitalsDto[]> {
        return await  this.vitalsRepository.find();
    }

    async addVital(vitals: VitalsDto): Promise<InsertResult>{
        return await this.vitalsRepository.insert(vitals);
    }

    async getVital(id: number): Promise<Vitals>{
        return this.vitalsRepository.findOne({
            where: {
                id,
            },
        });
    }

    

    async update(id: number, vital: VitalsDto): Promise<Vitals>{
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