import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity({
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
    name: 'phone_number',
    unique: true,
  })
  public phoneNumber: string;

  @Column()
  public password: string;

  @Column()
  public ip: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  public updatedAt: Date;

  @Column({
    default: false,
  })
  public confirmed: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 8);
  }
}
