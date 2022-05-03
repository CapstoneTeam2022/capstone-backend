import { Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private userService: UserService,
  ) {}

  getAllPatients(): Promise<Patient[]> {
    return this.patientRepository.find({
      relations: ['user', 'address'],
    });
  }

  async getPatient(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
    if (patient) return patient;
    throw new NotFoundException(`Patient with id ${id} not found`);
  }

  async addPatient({ user, registeredBy, ...data }: PatientDto) {
    //Pass the patient role here
    const newUser = await this.userService.addUser(user, 'patient');
    const registerer = await this.userService.getUser(registeredBy);
    const patient = this.patientRepository.create({
      ...data,
      user: newUser,
      registeredBy: registerer,
    });
    return patient;
  }
}
