import { UserService } from './../user/user.service';
import { DiseaseService } from './../disease/disease.service';

import { InvestigationRequestService } from './../investigation-request/investigation-request.service';
import { Diagnosis } from './diagnosis.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosisDto } from './dtos/diagnosis.dto';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(Diagnosis)
    private diagnosisRepository: Repository<Diagnosis>,
    private userService: UserService,
    private diseaseService: DiseaseService,
    private InvestigationServiceService: InvestigationRequestService,
  ) {}

  async addDiagnosis({
    investigationReqId,
    filledById,
    disease,
    ...diagnosisInfo
  }: DiagnosisDto) {
    const filledBy = await this.userService.getUser(filledById);
    const investigationRequest =
      await this.InvestigationServiceService.getInvestigationRequest(
        investigationReqId,
      );
    const diseaseData = await this.diseaseService.getDiseaseByName(disease);

    // if  not found Disease will occur  ,it will becreate  by the hospital admin !!!

    // const createdDisease = await this.diseaseService.saveDisease(disease);

    const diagnosis = this.diagnosisRepository.create({
      ...diagnosisInfo,
      disease: [diseaseData],
      filledBy,
      investigationRequest,
    });

    return this.diagnosisRepository.save(diagnosis);
  }
  getAllDiagnosis() {
    return this.diagnosisRepository.find();
  }

  async getOneDiagnosis(id: number) {
    const diagnosis = await this.diagnosisRepository.findOne(id, {
      relations: ['user', 'InvestigationService', 'disease'],
    });
    if (!diagnosis)
      throw new NotFoundException(
        `The diagnosis with this ${id} NOT FOUND !!!`,
      );
    return diagnosis;
  }
}
