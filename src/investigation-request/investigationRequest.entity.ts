import { Radiology } from './../radiology/radiology.entity';
import { Diagnosis } from './../diagnosis/diagnosis.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vitals } from '../vitals/vitals.entity';
import { User } from '../user/user.entity';
import { LabTest } from '../lab-test/labTest.entity';

@Entity()
export class InvestigationRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note: string;

  @Column()
  date: Date;

  @ManyToOne(() => Vitals, (vitals) => vitals.investigationRequests)
  vitals: Vitals;

  @ManyToOne(() => User, (user) => user.investigationRequests)
  registeredBy: User;

  @OneToMany(() => LabTest, (test) => test.investigationRequest)
  labTests: LabTest[];

  @OneToMany(() => Diagnosis, (diagnosis) => diagnosis.investigationRequest)
  diagnosis: Diagnosis[];

  @OneToMany(() => Radiology, (radiology) => radiology.investigationRequests)
  radiology: Radiology;
}
