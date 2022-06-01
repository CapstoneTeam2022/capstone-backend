import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LabResult } from '../lab-result/labResult.entity';

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

  @OneToMany(() => LabResult, (result) => result.labTest)
  labResults: LabResult[];
}
