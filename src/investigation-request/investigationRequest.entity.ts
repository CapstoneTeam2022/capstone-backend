import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vitals } from '../vitals/vitals.entity';
import { User } from '../user/user.entity';
import { LabTest } from '../lab-test/labTest.entity';
import { LabResult } from '../lab-result/labResult.entity';
import { Radiology } from '../radiology/radiology.entity';
import { Diagnosis } from '../diagnosis/entities/diagnosis.entity';

@Entity()
export class InvestigationRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Vitals, (vitals) => vitals.investigationRequests)
  vitals: Vitals;

  @ManyToOne(() => User, (user) => user.investigationRequests)
  registeredBy: User;

  @ManyToMany(() => LabTest)
  @JoinTable({ name: 'InvRequestLabTest' })
  labTests: LabTest[];

  @OneToMany(() => LabResult, (test) => test.investigationRequest)
  labResults: LabResult[];

  @OneToMany(() => Radiology, (radiology) => radiology.investigationRequest)
  radiologyTests: Radiology[];

  @OneToMany(() => Diagnosis, (diagnosis) => diagnosis.investigationRequest)
  diagnoses: Diagnosis[]; //diagnoses is the plural of diagnoses
}
