import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MohEmployee {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  emergencyContactName: string;

  @Column()
  emergencyContactPhone: string;

  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn()
  user: User;

  @ManyToMany(() => User, (user) => user.registeredPatients)
  registeredBy: User;

}
