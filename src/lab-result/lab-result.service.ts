import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { LabResult } from './labResult.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LabResultDto } from './dto';
import { UserService } from '../user/user.service';
import { InvestigationRequestService } from '../investigation-request/investigation-request.service';
import { LabTestService } from '../lab-test/lab-test.service';

@Injectable()
export class LabResultService {
  constructor(
    @InjectRepository(LabResult)
    private labResultRepository: Repository<LabResult>,
    private userService: UserService,
    private invRequestService: InvestigationRequestService,
    private labTestService: LabTestService,
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
    { investigationRequestId, labTestId, ...data }: LabResultDto,
    filledById: number,
    image: string,
  ) {
    const filledBy = await this.userService.getUser(filledById);
    let investigationRequest =
      await this.invRequestService.getInvestigationRequest(
        investigationRequestId,
      );
    investigationRequest = await this.invRequestService.decreaseCount(
      investigationRequestId,
    );
    const labTest = await this.labTestService.getLabTest(labTestId);
    const labResult = this.labResultRepository.create({
      ...data,
      filledBy,
      investigationRequest,
      image,
      labTest,
    });
    return this.labResultRepository.save(labResult);
  }

  async getAllFilledByUser(userId: number) {
    await this.userService.getUser(userId);
    return this.labResultRepository.find({
      where: {
        filledBy: {
          id: userId,
        },
      },
    });
  }
}
