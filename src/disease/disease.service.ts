import { Disease } from './disease.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiseaseDto } from './dtos/disease.dto';

@Injectable()
export class DiseaseService {
  constructor(
    @InjectRepository(Disease) private diseaseRepository: Repository<Disease>,
  ) {}
  saveDisease({ ...diseaseData }) {
    const disease = this.diseaseRepository.create({
      ...diseaseData,
    });
    return this.diseaseRepository.save(disease);
  }

  getDiseaseByName(name: String) {
    const disease = this.diseaseRepository.findOne({
      where: {
        name,
      },
    });
    if (disease) return disease;

    return null;
  }
  getAllDisease() {
    const diseases = this.diseaseRepository.find();
    return diseases;
  }
}
