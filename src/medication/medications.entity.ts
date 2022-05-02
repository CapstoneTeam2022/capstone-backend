import { IsInt } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Medications{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    medication: string;

//   @OneToMany(() => Prescription, (prescription) => prescription.medication)
//   @JoinColumn()
//   prescription: Prescription;
}