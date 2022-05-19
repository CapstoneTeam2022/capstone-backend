import { Injectable } from '@nestjs/common';
import { ExaminationDto } from './dto/create-examination.dto';
import { UpdateExaminationDto } from './dto/update-examination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Examination } from './entities/examination.entity';
@Injectable()
export class ExaminationService {
  constructor(
    @InjectRepository(Examination)
    private readonly examinationRepository: Repository<Examination>,
  ) {}

  create(examinationDto: ExaminationDto) {
    const examination = this.examinationRepository.create({
      ...examinationDto,
    });
    examination.date_time = Date.now();
    return this.examinationRepository.save(examination);
  }

  findAll() {
    return this.examinationRepository.find();
  }

  findOne(id: number) {
    const examination = this.examinationRepository.findOne({
      where: {
        id,
      },
    });
    return examination;
  }
}
