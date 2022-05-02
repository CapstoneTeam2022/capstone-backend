import { InvestigationRequestService } from './../investigation-request/investigation-request.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Radiology } from './radiology.entity';

@Injectable()
export class RadiologyService {
  constructor(
    @InjectRepository(Radiology)
    private radiologyRepository: Repository<Radiology>,
    private investigationRequestService: InvestigationRequestService,
  ) {}

  async addRadiology({ investigationRequest, ...radiologyInfo }) {
    const investigationRequestData =
      await this.investigationRequestService.getInvestigationRequest(
        investigationRequest,
      );

    const radiology = this.radiologyRepository.create({
      ...radiologyInfo,
      investigationRequests: [investigationRequestData],
    });

    return this.radiologyRepository.save(radiology);
  }
  getAllRadiology() {
    return this.radiologyRepository.find();
  }

  async getRadiology(id: number) {
    const Radiology = await this.radiologyRepository.findOne(id, {
      relations: ['user'],
    });
    if (!Radiology)
      throw new NotFoundException(
        `The Radiology with this ${id} NOT FOUND !!!`,
      );
    return Radiology;
  }
}
