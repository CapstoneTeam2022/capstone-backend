import { Diagnosis } from './../diagnosis/diagnosis.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Disease {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
