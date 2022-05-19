import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InvestigationRequest } from '../investigation-request/investigationRequest.entity';

@Entity()
export class LabTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  normalRange: string;

  @Column()
  measuredIn: string;

  @Column()
  testCategory: string;

  @ManyToOne(() => InvestigationRequest, (invReq) => invReq.labTests)
  investigationRequest: InvestigationRequest;
}
