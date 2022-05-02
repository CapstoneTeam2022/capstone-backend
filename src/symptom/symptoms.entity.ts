import { IsInt } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Symptoms{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    symptoms: string;

    @Column()
    physicalExaminations: string;

    // @ManyToOne(() => Patient, (patient) => patient.symptoms)
  // patient: Patient;

    // @ManyToOne(() => Vital, (vital) => vital.symptoms)
  // vital: Vital;

}