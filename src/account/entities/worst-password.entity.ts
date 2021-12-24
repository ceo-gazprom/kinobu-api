import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'worst_passwords',
})
export class WorstPasswordEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public password: string;
}
