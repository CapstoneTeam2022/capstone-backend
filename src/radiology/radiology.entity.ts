import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { InvestigationRequest } from '../investigation-request/investigationRequest.entity';

@Entity()
export class Radiology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  focalArea: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  filledDate: Date;

  @Column()
  report: string;

  @Column()
  image: string;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.filledRadiology)
  filledBy: User;

  @ManyToOne(() => InvestigationRequest, (invReq) => invReq.radiologyTests)
  investigationRequest: InvestigationRequest;
}
