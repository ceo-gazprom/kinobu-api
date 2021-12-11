import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
