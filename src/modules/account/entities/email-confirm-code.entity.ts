import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'email_confirm_codes',
})
export class EmailConfirmCodeEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public code: number;

  @Column({
    default: false,
  })
  public confirmed: boolean;
}
