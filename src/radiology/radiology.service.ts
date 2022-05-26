import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Radiology } from './radiology.entity';
import { Repository } from 'typeorm';
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
    { investigationRequestId, requestedById, ...data }: RadiologyDto,
    images,
  ): Promise<Radiology> {
    const investigationRequest =
      await this.invRequestService.getInvestigationRequest(
        investigationRequestId,
      );
    const requestedBy = await this.userService.getUser(requestedById);

    const radiologyTest = await this.radiologyRepository.create({
      ...data,
      investigationRequest,
      requestedBy,
    });
    const radiologyImages = images.map((img) => img.path);
    radiologyTest.images = radiologyImages;
    return this.radiologyRepository.save(radiologyTest);
  }
}
