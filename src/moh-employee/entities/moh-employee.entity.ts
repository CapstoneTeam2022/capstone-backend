import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MohEmployee {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // emergencyContactName: string;
  //
  // @Column()
  // emergencyContactPhone: string;

  @OneToOne(() => User, (user) => user.mohEmployee)
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, (user) => user.registeredMohEmployees)
  registeredBy: User;
}
