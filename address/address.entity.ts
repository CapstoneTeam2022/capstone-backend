import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HealthCenter } from '../health-center/healthcenter.entity';
import { User } from '../user/user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  subCity: string;

  @Column()
  zone: string;

  @Column()
  woreda: string;

  @Column()
  kebelle: string;

  @Column()
  street: string;

  @Column()
  houseNo: string;

  @OneToOne(() => HealthCenter, (healthCenter) => healthCenter.address)
  healthCenter: HealthCenter;

  @OneToOne(() => User, (user) => user.address)
  user: User;
}
