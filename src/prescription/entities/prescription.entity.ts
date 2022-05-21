import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Diagnosis } from '../../diagnosis/entities/diagnosis.entity';
import { Medication } from './mdication.entity';

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

  @OneToMany(() => Medication, (medication) => medication.prescription, {
    cascade: true,
  })
  medications: Medication[];

  @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.prescriptions)
  diagnosis: Diagnosis;
}
