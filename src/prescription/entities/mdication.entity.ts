import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Prescription } from './prescription.entity';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dosage: string;

  @Column()
  instructions: string;

  @ManyToOne(() => Prescription, (prescription) => prescription.medications)
  prescription: Prescription;
}
