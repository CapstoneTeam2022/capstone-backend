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
  orderDate: Date;

  @Column()
  filledDate: Date;

  @Column()
  report: string;

  @Column()
  images: string;

  @Column()
  focalarea: string;

  @ManyToOne(() => User, (user) => user.requestedRadiology)
  requestedBy: User;

  @OneToMany(() => InvestigationRequest, (inv) => inv.radiology)
  investigationRequests: InvestigationRequest[];
}
