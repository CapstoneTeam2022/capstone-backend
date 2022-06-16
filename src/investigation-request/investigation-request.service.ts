import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvestigationRequest } from './investigationRequest.entity';
import { Between, Repository } from 'typeorm';
import { InvestigationRequestDto } from './dto';
import { UserService } from '../user/user.service';
import { VitalsService } from '../vitals/vitals.service';
import { LabTestService } from 'src/lab-test/lab-test.service';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class InvestigationRequestService {
  constructor(
    @InjectRepository(InvestigationRequest)
    private investigationRequestRepository: Repository<InvestigationRequest>,
    private userService: UserService,
    private vitalService: VitalsService,
    private labTestService: LabTestService,
    private patientService: PatientService,
  ) {}

  getAll(): Promise<InvestigationRequest[]> {
    return this.investigationRequestRepository.find({
      relations: ['labTests'],
    });
  }

  getAllInDateRange(start: Date, end: Date) {
    return this.investigationRequestRepository.find({
      where: {
        createdAt: Between(start, end),
      },
    });
  }

  async getInvestigationRequest(id: number): Promise<InvestigationRequest> {
    const invRequest = await this.investigationRequestRepository.findOne({
      where: {
        id,
      },
      relations: ['labTests'],
    });
    if (invRequest) return invRequest;

    throw new NotFoundException(
      `Investigation Request with id ${id} not found`,
    );
  }

  async getAllWithRadiology() {
    return this.investigationRequestRepository
      .createQueryBuilder('invRequest')
      .leftJoinAndSelect('invRequest.labTests', 'test')
      .andWhere('test.testCategory=:cat', { cat: 'Radiology' })
      .getMany();
  }

  // async getTestsForInvestigationRequest(id: number) {
  //   await this.getInvestigationRequest(id);
  // }
  //
  // async getInvestigationRequestTests(): Promise<InvestigationRequest> {
  //   const invRequest = await this.investigationRequestRepository.findOne({
  //     relations: ['labTests'],
  //   });
  //   if (invRequest) return invRequest;
  //
  //   throw new NotFoundException(`Investigation Request not found`);
  // }

  async createInvestigationRequest(
    { vitalId, note, labTests }: InvestigationRequestDto,
    userId: number,
  ): Promise<InvestigationRequest> {
    const registeredBy = await this.userService.getUser(userId);
    const vitals = await this.vitalService.getVital(vitalId);
    for (const testId of labTests) {
      await this.labTestService.getLabTest(testId);
    }

    const invRequest = this.investigationRequestRepository.create({
      note,
      registeredBy,
      vitals,
      labTests: labTests.map((id) => ({ id })),
    });
    return this.investigationRequestRepository.save(invRequest);
  }

  async getAllForPatient(patientId: number, userId: number) {
    const user = await this.userService.getUser(userId);
    const healthCenterId = user.healthCenter.id;
    await this.patientService.getPatient(patientId);

    return this.investigationRequestRepository
      .createQueryBuilder('inv')
      .innerJoinAndSelect('inv.vitals', 'vital')
      .innerJoinAndSelect('vital.patient', 'patient')
      .innerJoinAndSelect('vital.requestedBy', 'user')
      .innerJoinAndSelect('user.healthCenter', 'h')
      .innerJoinAndSelect('patient.user', 'patient_user')
      .where('patient.id=:id', { id: patientId })
      .andWhere('h.id=:hid', { hid: healthCenterId })
      .select(['inv', 'vital', 'patient.id', 'patient_user.name'])
      .getMany();
  }
}
