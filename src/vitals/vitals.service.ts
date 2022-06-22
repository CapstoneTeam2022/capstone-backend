import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vitals } from './vitals.entity';
import { Repository } from 'typeorm';
import { VitalsDto } from './dto';
import { UserService } from '../user/user.service';
import { PatientService } from '../patient/patient.service';
import { ExaminationService } from '../examination/examination.services';

@Injectable()
export class VitalsService {
  constructor(
    @InjectRepository(Vitals)
    private vitalsRepository: Repository<Vitals>,
    private userService: UserService,
    private patientService: PatientService,
    @Inject(forwardRef(() => ExaminationService))
    private examinationService: ExaminationService,
  ) {}

  getAll(): Promise<Vitals[]> {
    return this.vitalsRepository.find({
      relations: ['patient', 'investigationRequests'],
    });
  }

  async getAllForPatient(userId: number) {
    const patient = await this.patientService.getPatientByUserId(userId);
    return this.vitalsRepository.find({
      where: {
        patient: {
          id: patient.id,
        },
      },
    });
  }

  async getAllForPatientInHospital(patientId: number, userId: number) {
    const user = await this.userService.getUser(userId);
    const healthCenterId = user.healthCenter.id;
    await this.patientService.getPatient(patientId); //check for patient with this id
    const vitals = await this.vitalsRepository
      .createQueryBuilder('vital')
      .innerJoinAndSelect('vital.patient', 'patient')
      .innerJoinAndSelect('vital.requestedBy', 'user')
      .innerJoinAndSelect('user.healthCenter', 'h')
      .innerJoinAndSelect('patient.user', 'patient_user')
      .where('patient.id=:id', { id: patientId })
      .andWhere('h.id=:hid', { hid: healthCenterId })
      .select(['vital', 'patient.id', 'patient_user.name'])
      .orderBy('vital.requestedDate', 'DESC')
      .getMany();

    for (const vital of vitals) {
      try {
        vital.examination =
          await this.examinationService.getExaminationForVital(vital.id);
      } catch (e: any) {
        vital.examination = null;
      }
    }

    return vitals;
  }

  async getVital(id: number): Promise<Vitals> {
    const vital = await this.vitalsRepository.findOne({
      where: {
        id,
      },
      relations: ['patient'],
    });
    if (vital) return vital;

    throw new NotFoundException(`Vital with id ${id} not found`);
  }

  async createVital({ patientId, ...body }: VitalsDto, requestedById: number) {
    const patient = await this.patientService.getPatient(patientId);
    const requestedBy = await this.userService.getUser(requestedById);
    const vital = this.vitalsRepository.create({
      ...body,
      patient,
      requestedBy,
    });
    return this.vitalsRepository.save(vital);
  }
}
