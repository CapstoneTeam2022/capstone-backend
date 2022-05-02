import { UserService } from './../user/user.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { Injectable } from '@nestjs/common';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    private userService: UserService,
  ) {}

  async addPatient(patientInfo) {
    const {
      name,
      phone,
      email,
      age,
      isAdmin,
      isResearcher,
      role,
      address,
      patientId,
      ...patientData
    } = patientInfo;

    const userData = {
      name,
      phone,
      email,
      age,
      isAdmin,
      isResearcher,
      role,
      address,
    };
    console.log(userData);
    const newuser = await this.userService.addUser(userData);
    console.log(newuser);

    // const patient = this.patientRepository.create({ ...patientData });
    // // console.log(patient);
    // patient['userId'] = newuser[""];
    // // return this.patientRepository.save(patient);
  }
}
