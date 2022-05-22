import { Vitals } from '../../vitals/vitals.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Examination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symptom: string;

  @Column()
  physical_examination: string;

  @CreateDateColumn()
  requestedDate: Date;

  @OneToOne(() => Vitals, (vital) => vital.examination)
  @JoinColumn()
  vital: Vitals;
}
