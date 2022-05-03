import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { InvestigationRequest } from '../investigation-request/investigationRequest.entity';

@Entity()
export class Radiology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: number;

  @Column()
  focalArea: string;

  @CreateDateColumn()
  orderDate: Date;

  @Column({ nullable: true })
  filledDate: Date;

  @Column()
  report: string;

  @Column()
  images: string;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.requestedRadiology)
  requestedBy: User;

  @ManyToOne(() => InvestigationRequest, (invReq) => invReq.radiologyTests)
  investigationRequest: InvestigationRequest;
}
