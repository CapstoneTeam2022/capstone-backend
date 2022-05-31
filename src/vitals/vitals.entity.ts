import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { User } from '../user/user.entity';
import { InvestigationRequest } from '../investigation-request/investigationRequest.entity';
import { Examination } from '../examination/entities/examination.entity';

@Entity()
export class Vitals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  temperature: number;

  @Column()
  pulse: number;

  @Column()
  respiratoryRate: number;

  @Column()
  bloodPressure: number;

  @Column()
  weight: number;

  @Column()
  spo2Level: number;

  @CreateDateColumn()
  requestedDate: Date;

  @Column({ nullable: true })
  filledDate: Date;

  @ManyToOne(() => Patient, (patient) => patient.vitals)
  patient: Patient;

  @ManyToOne(() => User, (user) => user.requestedVitals)
  requestedBy: User;

  @ManyToOne(() => User, (user) => user.filledVitals)
  filledBy: User;

  @OneToMany(() => InvestigationRequest, (inv) => inv.vitals)
  investigationRequests: InvestigationRequest[];

  @OneToOne(() => Examination, (examination) => examination.vital)
  examination: Examination;
}
