import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity()
export class Examination {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    symptom

    @Column()
    physical_examination

    @Column({ type: 'timestamptz' })
     date_time: Date;
 }
