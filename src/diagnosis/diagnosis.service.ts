import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Diagnosis } from './entities/diagnosis.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { InvestigationRequestService } from '../investigation-request/investigation-request.service';
import { DiseaseService } from '../disease/disease.service';
import { PatientService } from '../patient/patient.service';
import { VitalsService } from '../vitals/vitals.service';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(Diagnosis)
    private diagnosisRepository: Repository<Diagnosis>,
    private userService: UserService,
    private investigationRequestService: InvestigationRequestService,
    private diseaseService: DiseaseService,
    private patientService: PatientService,
    private vitalsService: VitalsService,
  ) {}

  async create(body: CreateDiagnosisDto) {
    const { filledById, investigationRequestId, diseases, ...data } = body;
    const filledBy = await this.userService.getUser(filledById);
    const investigationRequest =
      await this.investigationRequestService.getInvestigationRequest(
        investigationRequestId,
      );
    for (const id of diseases) {
      await this.diseaseService.findOne(id);
    }
    const diagnosis = this.diagnosisRepository.create({
      ...data,
      filledBy,
      investigationRequest,
      diseases: diseases.map((id) => ({ id })),
    });
    return this.diagnosisRepository.save(diagnosis);
  }

  findAll() {
    return this.diagnosisRepository.find({
      relations: ['diseases', 'investigationRequest'],
    });
  }

  async findOne(id: number) {
    const diagnosis = await this.diagnosisRepository.findOne({
      where: { id },
      relations: ['diseases', 'investigationRequest'],
    });

    if (diagnosis) return diagnosis;

    throw new NotFoundException(`Diagnosis with id ${id} not found`);
  }

  async findAllForInvestigationRequest(id: number) {
    await this.investigationRequestService.getInvestigationRequest(id);
    return this.diagnosisRepository.find({
      where: {
        investigationRequest: {
          id,
        },
      },
      relations: ['diseases', 'investigationRequest'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // async findAllForVitals(id: number) {
  //   await this.vitalsService.getVital(id);
  //   return this.diagnosisRepository.find({
  //     where: {
  //       investigationRequest: {
  //         vitals: {
  //           id,
  //         },
  //       },
  //     },
  //   });
  // }

  async findAllForPatient(id: number) {
    await this.patientService.getPatient(id);
    return this.diagnosisRepository
      .createQueryBuilder('diagnosis')
      .leftJoinAndSelect('diagnosis.investigationRequest', 'inv')
      .leftJoinAndSelect('inv.vitals', 'vitals')
      .leftJoinAndSelect('vitals.patient', 'patient')
      .andWhere('patient.id=:id', { id })
      .select(['diagnosis', 'inv.id', 'vitals.id', 'patient'])
      .getMany();
  }

  update(id: number, updateDiagnosisDto: UpdateDiagnosisDto) {
    return `This action updates a #${id} diagnosis`;
  }

  remove(id: number) {
    return `This action removes a #${id} diagnosis`;
  }
}
