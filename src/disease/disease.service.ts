import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiseaseDto } from './dto';
import { UpdateDiseaseDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disease } from './entities/disease.entity';

@Injectable()
export class DiseaseService {
  constructor(
    @InjectRepository(Disease)
    private diseaseRepository: Repository<Disease>,
  ) {}
  create(createDiseaseDto: CreateDiseaseDto) {
    const disease = this.diseaseRepository.create(createDiseaseDto);
    return this.diseaseRepository.save(disease);
  }

  findAll() {
    return this.diseaseRepository.find();
  }

  async findOne(id: number) {
    const disease = await this.diseaseRepository.findOne({
      where: {
        id,
      },
    });

    if (disease) return disease;

    throw new NotFoundException(`Disease with id ${id} not found`);
  }

  update(id: number, updateDiseaseDto: UpdateDiseaseDto) {
    return `This action updates a #${id} disease`;
  }

  remove(id: number) {
    return `This action removes a #${id} disease`;
  }
}
