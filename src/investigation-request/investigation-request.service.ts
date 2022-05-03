import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvestigationRequest } from './investigationRequest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvestigationRequestService {
  constructor(
    @InjectRepository(InvestigationRequest)
    private investigationRequest: Repository<InvestigationRequest>,
  ) {}

  getAll(): Promise<InvestigationRequest[]> {
    return this.investigationRequest.find();
  }
}
