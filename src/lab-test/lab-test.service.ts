import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabTest } from './labTest.entity';
import { Repository } from 'typeorm';
import { LabTestDto } from './dto';
import { InvestigationRequestService } from '../investigation-request/investigation-request.service';

@Injectable()
export class LabTestService {
  constructor(
    @InjectRepository(LabTest)
    private labTestRepository: Repository<LabTest>,
    private invRequestService: InvestigationRequestService,
  ) {}

  getAllLabTests(): Promise<LabTest[]> {
    return this.labTestRepository.find({ relations: ['investigationRequest'] });
  }

  async getLabTest(id: number) {
    const labTest = await this.labTestRepository.findOne(id);
    if (labTest) return labTest;
    throw new NotFoundException(`The Lab test with id ${id} not found`);
  }

  async createLabTest({
    // investigationRequestId,
    ...data
  }: LabTestDto): Promise<LabTest> {
    // const investigationRequest =
    //   await this.invRequestService.getInvestigationRequest(
    //     investigationRequestId,
    //   );
    const labTest = this.labTestRepository.create({
      ...data,
    });
    return this.labTestRepository.save(labTest);
  }
}
