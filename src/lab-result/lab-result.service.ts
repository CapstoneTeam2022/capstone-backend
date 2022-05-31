import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
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

  getAllInDateRange(start: Date, end: Date) {
    return this.labResultRepository.find({
      where: {
        createdAt: Between(start, end),
      },
    });
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

  async createLabResult(
    { filledById, investigationRequestId, ...data }: LabResultDto,
    image: string,
  ) {
    const filledBy = await this.userService.getUser(filledById);
    const investigationRequest =
      await this.invRequestService.getInvestigationRequest(
        investigationRequestId,
      );
    const labResult = this.labResultRepository.create({
      ...data,
      filledBy,
      investigationRequest,
      image,
    });
    return this.labResultRepository.save(labResult);
  }
}
