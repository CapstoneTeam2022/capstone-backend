import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LabResult } from './labResult.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LabResultDto } from './dto';
import { UserService } from '../user/user.service';
import { InvestigationRequestService } from '../investigation-request/investigation-request.service';

@Injectable()
export class LabResultService {
  constructor(
    @InjectRepository(LabResult)
    private labResultRepository: Repository<LabResult>,
    private userService: UserService,
    private invRequestService: InvestigationRequestService,
  ) {}

  getAll(): Promise<LabResult[]> {
    return this.labResultRepository.find();
  }

  async getLabResult(id: number) {
    const labResult = await this.labResultRepository.findOne({
      where: {
        id,
      },
    });
    if (labResult) return labResult;

    throw new NotFoundException(`Lab Result with id ${id} not found`);
  }

  async createLabResult({
    filledById,
    investigationRequestId,
    ...data
  }: LabResultDto) {
    const filledBy = await this.userService.getUser(filledById);
    const investigationRequest =
      await this.invRequestService.getInvestigationRequest(
        investigationRequestId,
      );
    const labResult = this.labResultRepository.create({
      ...data,
      filledBy,
      investigationRequest,
    });
    return this.labResultRepository.save(labResult);
  }
}
