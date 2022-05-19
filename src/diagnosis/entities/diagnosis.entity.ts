import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { InvestigationRequest } from '../../investigation-request/investigationRequest.entity';
import { Disease } from '../../disease/entities/disease.entity';
import { JoinTable } from 'typeorm';

@Entity()
export class Diagnosis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.filledDiagnosis)
  filledBy: User;

  @ManyToOne(
    () => InvestigationRequest,
    (investigationReq) => investigationReq.diagnoses,
  )
  investigationRequest: InvestigationRequest;

  @ManyToMany(() => Disease)
  @JoinTable({ name: 'DiagnosisDisease' }) //Join table name will be 'DiagnosisDisease'
  diseases: Disease[];
}
