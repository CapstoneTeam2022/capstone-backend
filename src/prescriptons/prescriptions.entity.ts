import { IsInt } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Prescriptions{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;


//   @ManyToOne(() => Medication, (medication) => medication.prescription)
//   @JoinColumn()
//   medication: Medication;
    
    //   @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.prescription)
//   @JoinColumn()
//   diagnosis: Diagnosis;
    
    //   @ManyToOne(() => InvestigationRequest, (invReq) => invReq.prescription)
//   @JoinColumn()
//   invReq: InvestigationRequest;
    

    
}