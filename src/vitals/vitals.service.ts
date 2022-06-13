import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vitals } from './vitals.entity';
import { Repository } from 'typeorm';
import { VitalsDto } from './dto';
import { UserService } from '../user/user.service';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class VitalsService {
  constructor(
    @InjectRepository(Vitals)
    private vitalsRepository: Repository<Vitals>,
    private userService: UserService,
    private patientService: PatientService,
  ) {}

  getAll(): Promise<Vitals[]> {
    return this.vitalsRepository.find({
      relations: ['patient', 'investigationRequests'],
    });
  }

  async getAllForPatient(patientId: number, userId: number) {
    const user = await this.userService.getUser(userId);
    const healthCenterId = user.healthCenter.id;
    await this.patientService.getPatient(patientId); //check for patient with this id
    // return this.vitalsRepository.find({
    //   where: {
    //     patient: {
    //       id: patientId,
    //     },
    //   },
    //   order: {
    //     requestedDate: 'DESC',
    //   },
    // });
    return this.vitalsRepository
      .createQueryBuilder('vital')
      .innerJoinAndSelect('vital.patient', 'patient')
      .innerJoinAndSelect('vital.requestedBy', 'user')
      .innerJoinAndSelect('user.healthCenter', 'h')
      .where('patient.id=:id', { id: patientId })
      .where('h.id=:id', { id: healthCenterId })
      .select(['vital', 'patient'])
      .getMany();
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

  async createVital({ patientId, requestedById, ...body }: VitalsDto) {
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
