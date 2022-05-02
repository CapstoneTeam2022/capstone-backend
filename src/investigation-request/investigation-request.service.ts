import { InvestigationRequest } from './investigationRequest.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';

@Injectable()
export class InvestigationRequestService {
  constructor(
    @InjectRepository(InvestigationRequest)
    private investigationRequestRepository: Repository<InvestigationRequest>,
  ) {}

  addInvestigationRequest({ ...investigationData }) {
    const investigationRequest = this.investigationRequestRepository.create({
      ...investigationData,
    });

    return this.investigationRequestRepository.save(investigationRequest);
  }

  getAllInvestigationRequest() {
    return this.investigationRequestRepository.find();
  }

  async getInvestigationRequest(id: number) {
    try {
      return await this.investigationRequestRepository.findOneOrFail(id);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(
          `Investigation Request  with id ${id} not found`,
        );
      }
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
