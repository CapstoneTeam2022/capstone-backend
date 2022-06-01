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

  @Column({ nullable: true })
  zone?: string;

  @Column({ nullable: true })
  woreda?: string;

  @Column({ nullable: true })
  kebelle?: string;

  @Column({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  houseNo?: string;

  @OneToOne(() => HealthCenter, (healthCenter) => healthCenter.address)
  healthCenter?: HealthCenter;

  @OneToOne(() => User, (user) => user.address)
  user: User;
}
