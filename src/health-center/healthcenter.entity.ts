import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../address/address.entity';

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

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Address, (address) => address.healthCenter)
  @JoinColumn()
  address: Address;
}
