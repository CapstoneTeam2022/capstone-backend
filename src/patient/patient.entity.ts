import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Vitals } from '../vitals/vitals.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emergencyContactName: string;

  @Column()
  emergencyContactPhone: string;

  @Column()
  refId: string;

  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, (user) => user.registeredPatients)
  registeredBy: User;

  @OneToMany(() => Vitals, (vitals) => vitals.patient)
  vitals: Vitals[];
}
