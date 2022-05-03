import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvestigationRequest } from './investigationRequest.entity';
import { Repository } from 'typeorm';
import { InvestigationRequestDto } from './dto';
import { UserService } from '../user/user.service';
import { VitalsService } from '../vitals/vitals.service';

@Injectable()
export class InvestigationRequestService {
  constructor(
    @InjectRepository(InvestigationRequest)
    private investigationRequestRepository: Repository<InvestigationRequest>,
    private userService: UserService,
    private vitalService: VitalsService,
  ) {}

  getAll(): Promise<InvestigationRequest[]> {
    return this.investigationRequestRepository.find();
  }

  async getInvestigationRequest(id: number): Promise<InvestigationRequest> {
    const invRequest = await this.investigationRequestRepository.findOne({
      where: {
        id,
      },
    });
    if (invRequest) return invRequest;

    throw new NotFoundException(
      `Investigation Request with id ${id} not found`,
    );
  }

  async createInvestigationRequest({
    registeredById,
    vitalId,
    note,
  }: InvestigationRequestDto): Promise<InvestigationRequest> {
    const registeredBy = await this.userService.getUser(registeredById);
    const vitals = await this.vitalService.getVital(vitalId);
    const invRequest = this.investigationRequestRepository.create({
      note,
      registeredBy,
      vitals,
    });
    return this.investigationRequestRepository.save(invRequest);
  }
}
