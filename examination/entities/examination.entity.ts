import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Examination {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    symptom: string;

    @Column()
    physical_examination: string;

    @Column({ type: 'timestamptz' })
     date_time: Date;
 }
