import { IsBoolean, IsInt } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LabResult{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({ type: 'timestamptz' })
    FilledDate: string;

    @Column()
    FilledBy: string;

    @Column()
    result: string;

    @Column()
    measuredIn: string;

    @Column()
    normalRangeFrom: number;

    @Column()
    normalRangeTo: number;

    @Column()
    isAbnormal: boolean;

    @Column()
    comment: string;
}
