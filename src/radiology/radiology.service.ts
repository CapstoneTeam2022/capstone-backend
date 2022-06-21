import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Radiology } from './radiology.entity';
import { Between, Repository } from 'typeorm';
import { RadiologyDto } from './dto';
import { InvestigationRequestService } from '../investigation-request/investigation-request.service';
import { UserService } from '../user/user.service';

@Injectable()
export class RadiologyService {
  constructor(
    @InjectRepository(Radiology)
    private radiologyRepository: Repository<Radiology>,
    private invRequestService: InvestigationRequestService,
    private userService: UserService,
  ) {}

  getAll(): Promise<Radiology[]> {
    return this.radiologyRepository.find();
  }

  getAllInDateRange(start: Date, end: Date) {
    return this.radiologyRepository.find({
      where: {
        createdAt: Between(start, end),
      },
    });
  }

  async getOne(id: number) {
    const radiologyTest = await this.radiologyRepository.findOne({
      where: {
        id,
      },
    });
    if (radiologyTest) return radiologyTest;

    throw new NotFoundException(`The Radiology test with id ${id} not found`);
  }

  async create(
    { investigationRequestId, ...data }: RadiologyDto,
    filledById: number,
  ): Promise<Radiology> {
    const investigationRequest =
      await this.invRequestService.getInvestigationRequest(
        investigationRequestId,
      );
    const filledBy = await this.userService.getUser(filledById);

    const radiologyTest = await this.radiologyRepository.create({
      ...data,
      investigationRequest,
      filledBy,
      image: '',
    });
    return this.radiologyRepository.save(radiologyTest);
  }
}
