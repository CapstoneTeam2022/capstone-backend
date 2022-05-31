import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvestigationRequest } from '../investigation-request/investigationRequest.entity';
import { User } from '../user/user.entity';

@Entity()
export class LabResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  filledDate: string;

  @Column()
  result: string;

  @Column()
  isAbnormal: boolean;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => InvestigationRequest, (invReq) => invReq.labResults)
  investigationRequest: InvestigationRequest;

  @ManyToOne(() => User, (user) => user.filledLabResults)
  filledBy: User;
}
