import { Vitals } from 'src/vitals/vitals.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Examination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symptom: string;

  @Column()
  physical_examination: string;

  @Column({ type: 'timestamptz' })
  date_time: Date;

  @OneToOne(() => Vitals, (vital) => vital.examination)
  vital: Vitals;
}
