import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LabTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  normalRange: string;

  @Column()
  measuredIn: string;

  @Column()
  testCategory: string;
}
