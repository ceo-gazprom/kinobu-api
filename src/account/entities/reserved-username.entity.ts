import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  schema: 'account',
  name: 'reserved_usernames',
})
export class ReservedUsernameEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false })
  public username: string;
}
