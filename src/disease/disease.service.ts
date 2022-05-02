import { DiseaseDto } from './dtos/disease.dto';
import { Disease } from './disease.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DiseaseService {
  constructor(
    @InjectRepository(Disease) private diseaseRepository: Repository<Disease>,
  ) {}
  saveDisease({ ...diseaseData }: DiseaseDto) {
    const disease = this.diseaseRepository.create({
      ...diseaseData,
    });
    return this.diseaseRepository.save(disease);
  }
}
