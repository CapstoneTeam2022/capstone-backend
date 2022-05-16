import { Diagnosis } from './../diagnosis/diagnosis.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Disease {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
  @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.disease)
  diagnosis: Diagnosis;
}
