import { User } from "src/user/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

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
    
    @ManyToOne(() => User, (user) => user.examination)
    examination: User;
 }
