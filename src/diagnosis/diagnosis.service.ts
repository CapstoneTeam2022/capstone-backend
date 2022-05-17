import { PatientService } from './../patient/patient.service';
import { Patient } from './../patient/patient.entity';
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
    private patientService: PatientService,
  ) {}

  async addDiagnosis({
    patientId,
    filledById,
    disease,
    ...diagnosisInfo
  }: DiagnosisDto) {
    const filledBy = await this.userService.getUser(filledById);
    const patient = await this.patientService.getPatient(patientId);
    const createdDisease = await this.diseaseService.saveDisease(disease);

    const diagnosis = this.diagnosisRepository.create({
      ...diagnosisInfo,
      disease: [createdDisease],
      filledBy,
      patient,
    });

    return this.diagnosisRepository.save(diagnosis);
  }
  getAllDiagnosis() {
    return this.diagnosisRepository.find();
  }

  async getOneDiagnosis(id: number) {
    const diagnosis = await this.diagnosisRepository.findOne(id, {
      relations: ['user', 'patient', 'disease'],
    });
    if (!diagnosis)
      throw new NotFoundException(
        `The diagnosis with this ${id} NOT FOUND !!!`,
      );
    return diagnosis;
  }
}
