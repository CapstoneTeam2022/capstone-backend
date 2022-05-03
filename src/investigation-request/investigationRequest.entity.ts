import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vitals } from '../vitals/vitals.entity';
import { User } from '../user/user.entity';
import { LabTest } from '../lab-test/labTest.entity';
import { LabResult } from '../lab-result/labResult.entity';

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

  @OneToMany(() => LabTest, (test) => test.investigationRequest)
  labTests: LabTest[];

  @OneToMany(() => LabResult, (test) => test.investigationRequest)
  labResults: LabResult[];
}
