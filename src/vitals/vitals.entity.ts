import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {
    IsInt,
    IsDate
} from 'class-validator';
@Entity()
export class vitals{
  @PrimaryGeneratedColumn()
    id: number;
  
  @Column()
    patientId: number;
    
  @Column()
    @IsInt()
    temprature: number;

    @Column()
    @IsInt()
    pulse: number;

  @Column()
    @IsInt()
    respiratoryRate: number;

  @Column()
    @IsInt()
    bloodPressure: number;
    
    @Column()
    @IsInt()
    weight: number;
    
    @Column()
    @IsInt()
    spo2level: number;
    
    @Column()
    @IsInt()
    heartRate: number;
    
    @Column()
    requestedDate: number;
    
    @Column()
    filledDate: number;

    @Column()
    requestedBy: string;
    
  @Column()
  filledBy: string;
}