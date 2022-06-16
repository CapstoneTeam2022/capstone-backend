import { Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { PatientDto } from './dto';
import { UserService } from '../user/user.service';

import { uuid } from 'uuidv4';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private userService: UserService,
  ) {}

  getAllPatients(): Promise<Patient[]> {
    return this.patientRepository.find({
      relations: ['user'],
    });
  }

  getAllInDateRange(start: Date, end: Date) {
    return this.patientRepository.find({
      where: {
        user: {
          createdAt: Between(start, end),
        },
      },
      relations: ['user'],
    });
  }

  async getPatient(id: number) {
    const patient = await this.patientRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (patient) {
      const user = await this.userService.getUser(patient.user.id);
      return {
        ...patient,
        user: {
          ...patient.user,
          address: user.address,
        },
      };
    }
    throw new NotFoundException(`Patient with id ${id} not found`);
  }

  async getPatientByRef(refId: string) {
    const patient = await this.patientRepository.findOne({
      where: {
        refId: refId,
      },
      relations: ['user'],
    });

    if (patient) {
      const user = await this.userService.getUser(patient.user.id);
      return {
        ...patient,
        user: {
          ...patient.user,
          address: user.address,
        },
      };
    }
    throw new NotFoundException(`Patient with ref id ${refId} not found`);
  }

  async addPatient({ user, registeredBy, ...data }: PatientDto) {
    //Pass the patient role here
    const newUser = await this.userService.addUser(user, 'Patient');
    const registerer = await this.userService.getUser(registeredBy);
    const patient = this.patientRepository.create({
      ...data,
      user: newUser,
      refId: uuid(),
      registeredBy: registerer,
    });
    this.patientRepository.save(patient);
    return patient;
  }

  async deletePatient(id: number) {
    const patient = await this.getPatient(id);
    const user = await this.userService.getUser(patient.user.id);
    await this.patientRepository.delete(patient.id);
    await this.userService.deleteUser(user.id);
    return {
      msg: 'success',
    };
  }

  async getPatientRecord() {
    const ageGroup = {};
    let infants = 0;
    let toddler = 0;
    let child = 0;
    let teen = 0;
    let adult = 0;
    let middle_age_adult = 0;
    let senior_adult = 0;

    const patients = this.getAllPatients();
    (await patients).map((patient) => {
      if (patient.user.age >= 0 && patient.user.age <= 1) {
        infants = infants + 1;
      } else if (patient.user.age >= 2 && patient.user.age <= 4) {
        toddler = toddler + 1;
      } else if (patient.user.age >= 5 && patient.user.age <= 12) {
        child = child + 1;
      } else if (patient.user.age >= 13 && patient.user.age <= 19) {
        teen = teen + 1;
      } else if (patient.user.age >= 20 && patient.user.age <= 39) {
        adult = adult + 1;
      } else if (patient.user.age >= 40 && patient.user.age <= 59) {
        middle_age_adult = middle_age_adult + 1;
      } else if (patient.user.age >= 60) {
        senior_adult = senior_adult + 1;
      } else {
      }
    });

    ageGroup['infant'] = infants;
    ageGroup['toddler'] = toddler;
    ageGroup['child'] = child;
    ageGroup['teen'] = teen;
    ageGroup['adult'] = adult;
    ageGroup['middle_age_adult'] = middle_age_adult;
    ageGroup['senior_adult'] = senior_adult;

    return ageGroup;
  }

  async getNumOfPatients() {
    const num = (
      await this.patientRepository.find({
        relations: ['user'],
      })
    ).length;
    return num;
  }
}
