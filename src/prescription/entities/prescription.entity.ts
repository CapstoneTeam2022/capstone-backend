import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Diagnosis } from '../../diagnosis/entities/diagnosis.entity';

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // comment: string;

  @CreateDateColumn()
  createdAt: Date;

  // @Column('text', { array: true })
  // medications: string[];

  @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.prescriptions)
  diagnosis: Diagnosis;
}
