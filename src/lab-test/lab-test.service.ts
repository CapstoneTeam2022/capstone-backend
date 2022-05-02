import { LabTest } from './labTest.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLabResultDto } from './dtos/create-labTest.dto';

@Injectable()
export class LabTestService {
  constructor(
    @InjectRepository(LabTest) private labResultRepository: Repository<LabTest>,
  ) {}

  createLabTest({ investigation, ...labTestInfo }) {
    const labresult = this.labResultRepository.create({
      ...labTestInfo,
    });
    return this.labResultRepository.save(labresult);
  }
}
