import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { InvestigationRequest } from '../../investigation-request/investigationRequest.entity';

//@Entity()
export class Diagnosis {
  // @PrimaryGeneratedColumn()
  // id: number;
  //
  // @Column()
  // comment: string;
  //
  // @Column()
  // measuredIn: string;
  //
  // // @OneToMany(() => Disease, (disease) => disease.diagnosis)
  // // disease: Disease[];
  //
  // @ManyToOne(() => User, (user) => user.diagnosis)
  // filledBy: User;
  //
  // @ManyToOne(
  //   () => InvestigationRequest,
  //   (investigationReq) => investigationReq.diagnosis,
  // )
  // investigationRequest: InvestigationRequest;
}
