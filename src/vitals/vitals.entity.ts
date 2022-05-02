import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
// import { Patient } from '../patient/patient.entity';
// import { User } from '../user/user.entity';
// import { InvestigationRequest } from '../investigation-request/investigationRequest.entity';

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
  requestedDate: String;

  @Column({ nullable: true, default: Timestamp })
  filledDate: String;

  // @ManyToOne(() => Patient, (patient) => patient.vitals)
  // patient: Patient;

  // @ManyToOne(() => User, (user) => user.requestedVitals)
  // requestedBy: User;

  // @ManyToOne(() => User, (user) => user.filledVitals)
  // filledBy: User;

  // @OneToMany(() => InvestigationRequest, (inv) => inv.vitals)
  // investigationRequests: InvestigationRequest[];
}
