import { Disease } from './../disease/disease.entity';
import { User } from './../user/user.entity';
import { InvestigationRequest } from './../investigation-request/investigationRequest.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Diagnosis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  measuredIn: string;

  @Column()
  disease: string;

  @ManyToOne(() => User, (user) => user.filledBy)
  filledBy: User;

  @ManyToOne(() => InvestigationRequest, (invReq) => invReq.diagnosis)
  investigationRequest: InvestigationRequest;
}
