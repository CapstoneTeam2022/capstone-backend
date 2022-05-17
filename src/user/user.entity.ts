import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../address/address.entity';
import { Role } from '../role/role.entity';
import { Patient } from '../patient/patient.entity';
import { Vitals } from '../vitals/vitals.entity';
import { InvestigationRequest } from '../investigation-request/investigationRequest.entity';
import { LabResult } from '../lab-result/labResult.entity';
import { Radiology } from '../radiology/radiology.entity';
import { HealthCenter } from '../health-center/healthcenter.entity';
import { MohEmployee } from '../moh-employee/entities/moh-employee.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  isResearcher: boolean;

  @Column()
  isAdmin: boolean;

  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToOne(() => Patient, (patient) => patient.user)
  patient: Patient;

  @OneToMany(() => Patient, (patient) => patient.registeredBy)
  registeredPatients: Patient[];

  @OneToMany(() => Vitals, (vitals) => vitals.requestedBy)
  requestedVitals: Vitals[];

  @OneToMany(() => Vitals, (vitals) => vitals.filledBy)
  filledVitals: Vitals[];

  @OneToMany(() => InvestigationRequest, (inv) => inv.registeredBy)
  investigationRequests: InvestigationRequest[];

  @OneToMany(() => LabResult, (results) => results.filledBy)
  filledLabResults: LabResult[];

  @OneToMany(() => Radiology, (radiology) => radiology.requestedBy)
  requestedRadiology: Radiology[];

  @ManyToOne(() => HealthCenter, (healthCenter) => healthCenter.users)
  healthCenter: HealthCenter;

  @OneToOne(() => MohEmployee, (mohEmployee) => mohEmployee.user)
  mohEmployee: MohEmployee;

  @OneToMany(() => MohEmployee, (mohEmployee) => mohEmployee.registeredBy)
  registeredMohEmployees: MohEmployee[];
}
