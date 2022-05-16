import { Patient } from './../patient/patient.entity';
import { Disease } from './../disease/disease.entity';
import { User } from './../user/user.entity';

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Diagnosis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  measuredIn: string;

  @OneToMany(() => Disease, (disease) => disease.diagnosis)
  disease: Disease[];

  @ManyToOne(() => User, (user) => user.diagnosis)
  filledBy: User;

  @ManyToOne(() => Patient, (patient) => patient.diagnosis)
  patient: Patient;
}
