import { Injectable, NotFoundException } from '@nestjs/common';
import { ExaminationDto } from './dto/create-examination.dto';
import { UpdateExaminationDto } from './dto/update-examination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Examination } from './entities/examination.entity';
import { VitalsService } from '../vitals/vitals.service';
@Injectable()
export class ExaminationService {
  constructor(
    @InjectRepository(Examination)
    private readonly examinationRepository: Repository<Examination>,
    private readonly vitalService: VitalsService,
  ) {}

  async create({ vitalId, ...data }: ExaminationDto) {
    const vital = await this.vitalService.getVital(vitalId);
    const examination = this.examinationRepository.create({
      ...data,
      vital,
    });
    return this.examinationRepository.save(examination);
  }

  findAll() {
    return this.examinationRepository.find();
  }

  async findOne(id: number) {
    const examination = await this.examinationRepository.findOne({
      where: {
        id,
      },
    });
    if (examination) return examination;

    throw new NotFoundException(`Examination with id ${id} not found`);
  }
}
