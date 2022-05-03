import { IsBoolean, IsInt } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvestigationRequest } from '../investigation-request/investigationRequest.entity';

@Entity()
export class LabResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @CreateDateColumn()
  filledDate: string;

  @Column()
  result: string;

  @Column()
  isAbnormal: boolean;

  @Column()
  comment: string;

  @ManyToOne(() => InvestigationRequest, (invReq) => invReq.labResults)
  investigationRequest: InvestigationRequest;
}
