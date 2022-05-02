import { DiagnosisDto } from './dtos/create-diagnosis.dto';
import { DiseaseService } from './../disease/disease.service';
import { InvestigationRequestService } from './../investigation-request/investigation-request.service';
import { Diagnosis } from './diagnosis.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(Diagnosis)
    private diagnosisRepository: Repository<Diagnosis>,
    private investigationRequestService: InvestigationRequestService,
    private diseaseService: DiseaseService,
  ) {}

  async addDiagnosis({
    investigationRequest,
    disease,
    ...diagnosisInfo
  }: DiagnosisDto) {
    const investigationRequestData =
      await this.investigationRequestService.getInvestigationRequest(
        investigationRequest,
      );

    // const createdDisease = await this.diseaseService.saveDisease(disease);

    const diagnosis = this.diagnosisRepository.create({
      ...diagnosisInfo,

      investigationRequest: investigationRequestData,
    });

    return this.diagnosisRepository.save(diagnosis);
  }
  getAllDiagnosis() {
    return this.diagnosisRepository.find();
  }

  async getDiagnosis(id: number) {
    const diagnosis = await this.diagnosisRepository.findOne(id, {
      relations: ['user'],
    });
    if (!diagnosis)
      throw new NotFoundException(
        `The diagnosis with this ${id} NOT FOUND !!!`,
      );
    return diagnosis;
  }
}
