import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvestigationRequest } from './investigationRequest.entity';
import { Repository } from 'typeorm';
import { InvestigationRequestDto } from './dto';
import { UserService } from '../user/user.service';
import { VitalsService } from '../vitals/vitals.service';
import { LabTestService } from 'src/lab-test/lab-test.service';

@Injectable()
export class InvestigationRequestService {
  constructor(
    @InjectRepository(InvestigationRequest)
    private investigationRequestRepository: Repository<InvestigationRequest>,
    private userService: UserService,
    private vitalService: VitalsService,
    private labTestService: LabTestService,
  ) {}

  getAll(): Promise<InvestigationRequest[]> {
    return this.investigationRequestRepository.find();
  }

  async getInvestigationRequest(id: number): Promise<InvestigationRequest> {
    const invRequest = await this.investigationRequestRepository.findOne({
      where: {
        id,
      },
      relations: ['labTests'],
    });
    if (invRequest) return invRequest;

    throw new NotFoundException(
      `Investigation Request with id ${id} not found`,
    );
  }

  // async getTestsForInvestigationRequest(id: number) {
  //   await this.getInvestigationRequest(id);
  // }
  //
  // async getInvestigationRequestTests(): Promise<InvestigationRequest> {
  //   const invRequest = await this.investigationRequestRepository.findOne({
  //     relations: ['labTests'],
  //   });
  //   if (invRequest) return invRequest;
  //
  //   throw new NotFoundException(`Investigation Request not found`);
  // }

  async createInvestigationRequest({
    registeredById,
    vitalId,
    note,
    labTests,
  }: InvestigationRequestDto): Promise<InvestigationRequest> {
    const registeredBy = await this.userService.getUser(registeredById);
    const vitals = await this.vitalService.getVital(vitalId);
    for (const testId of labTests) {
      await this.labTestService.getLabTest(testId);
    }

    const invRequest = this.investigationRequestRepository.create({
      note,
      registeredBy,
      vitals,
      labTests: labTests.map((id) => ({ id })),
    });
    return this.investigationRequestRepository.save(invRequest);
  }
}
