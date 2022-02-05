import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({
  schema: 'account',
  name: 'accounts',
})
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column({
    unique: true,
  })
  public phoneNumber: string;

  @Column()
  public password: string;

  @Column()
  public ip: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({
    default: false,
  })
  public confirmed: boolean;
}
