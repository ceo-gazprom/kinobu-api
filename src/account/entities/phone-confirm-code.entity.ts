import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  schema: 'account',
  name: 'phone_confirm_codes',
})
export class PhoneConfirmCodeEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public phone: string;

  @Column()
  public code: number;

  @Column({
    default: false,
  })
  public confirmed: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
