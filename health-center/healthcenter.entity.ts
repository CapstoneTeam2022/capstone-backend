import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../address/address.entity';
import { User } from '../user/user.entity';

@Entity()
export class HealthCenter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  type: string;

  @OneToOne(() => Address, (address) => address.healthCenter)
  @JoinColumn()
  address: Address;

  @OneToMany(() => User, (user) => user.healthCenter)
  users: User[];
}
