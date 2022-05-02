import { InvestigationRequestService } from './../investigation-request/investigation-request.service';
import { InvestigationRequest } from './../investigation-request/investigationRequest.entity';
import { LabTest } from './labTest.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLabTestDto } from './dtos/create-labTest.dto';

@Injectable()
export class LabTestService {
  constructor(
    @InjectRepository(LabTest) private labTestRepository: Repository<LabTest>,

    private investigationService: InvestigationRequestService,
  ) {}

  async createLabTest({
    investigationRequest,
    ...labTestInfo
  }: CreateLabTestDto) {
    const investigationRequestData =
      await this.investigationService.getInvestigationRequest(
        investigationRequest,
      );

    const labTest = this.labTestRepository.create({
      investigationRequest: investigationRequestData,
      ...labTestInfo,
    });
    return this.labTestRepository.save(labTest);
  }

  async getLabTest(id: number) {
    const labresult = await this.labTestRepository.findOne(id);
    if (!labresult)
      throw new NotFoundException(`The User with this ${id} NOT FOUND !!!`);
    return labresult;
  }
  getAllLabTest() {
    return this.labTestRepository.find({ relations: ['investigationRequest'] });
  }

  async updateLabTest(id: number, { investigationRequest, ...labtestInfo }) {
    const labTest = await this.getLabTest(id);
    const investigationRequestData =
      await this.investigationService.getInvestigationRequest(
        investigationRequest,
      );
    const newLabTest = { ...labtestInfo };
    labTest.name = newLabTest.name || labTest.name;
    labTest.normalRange = newLabTest.normalRange || labTest.normalRange;
    labTest.testCategory = newLabTest.testCategory || labTest.testCategory;
    labTest.investigationRequest = investigationRequestData;

    return this.labTestRepository.save(labTest);
  }
}
