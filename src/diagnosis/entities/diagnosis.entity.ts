import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { InvestigationRequest } from '../../investigation-request/investigationRequest.entity';

@Entity()
export class Diagnosis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  measuredIn: string;

  @CreateDateColumn()
  createdAt: Date;

  // @OneToMany(() => Disease, (disease) => disease.diagnosis)
  // disease: Disease[];

  @ManyToOne(() => User, (user) => user.filledDiagnosis)
  filledBy: User;

  @ManyToOne(
    () => InvestigationRequest,
    (investigationReq) => investigationReq.diagnoses,
  )
  investigationRequest: InvestigationRequest;
}
