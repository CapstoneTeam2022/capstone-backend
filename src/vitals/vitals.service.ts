import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vitals } from './vitals.entity';
import { Repository } from 'typeorm';
import { VitalsDto } from './dto';

@Injectable()
export class VitalsService {
  constructor(
    @InjectRepository(Vitals)
    private vitalsRepository: Repository<Vitals>,
  ) {}

  getAll(): Promise<Vitals[]> {
    return this.vitalsRepository.find();
  }

  async getVital(id: number): Promise<Vitals> {
    const vital = await this.vitalsRepository.findOne({
      where: {
        id,
      },
    });
    if (vital) return vital;

    throw new NotFoundException(`Vital with id ${id} not found`);
  }

  async createVital(body: VitalsDto) {
    const vital = this.vitalsRepository.create({
      ...body,
    });
    return this.vitalsRepository.save(vital);
  }
}
