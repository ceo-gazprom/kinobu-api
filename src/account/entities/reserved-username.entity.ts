import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'reserved_usernames',
})
export class ReservedUsernameEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public username: string;
}
