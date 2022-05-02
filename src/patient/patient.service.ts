import { UserService } from './../user/user.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    private userService: UserService,
  ) {}

  async addPatient({ user, ...patientData }) {
    const createdUser = await this.userService.addUser(user);

    const patient = this.patientRepository.create({
      ...patientData,
      user,
    });
    console.log(patient);
    patient.user.id = createdUser['id'];

    const result = await this.patientRepository.save(patient);
    return result;
  }
  getAllPatient() {
    const patient = this.patientRepository.find({
      relations: ['user,address'],
    });
    return patient;
  }

  async getPatientInfo(id: number) {
    const user = await this.patientRepository.findOne(id, {
      relations: ['user'],
    });
    if (!user)
      throw new NotFoundException(`The patient with this ${id} NOT FOUND !!!`);
    return user;
  }

  async updatePatientInfo(id: number, patientInfo) {
    const patient = await this.getPatientInfo(id);

    const user = await this.userService.updateUserInfo(
      patientInfo.user.id,
      patientInfo.user,
    );
    patient.emergencyContactName =
      patientInfo.emergencyContactName || patient.emergencyContactName;
    patient.emergencyContactPhone =
      patientInfo.emergencyContactPhone || patient.emergencyContactPhone;
    patient.user = user;
    return this.patientRepository.save(patient);
  }
}
