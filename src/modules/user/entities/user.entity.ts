import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { hash, compare } from 'bcrypt';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ unique: true })
  public username: string;

  @Column({
    type: 'int',
    default: 0,
  })
  public rating: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  private createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  private updatedAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
