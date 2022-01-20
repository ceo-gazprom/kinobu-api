import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// todo: add extention from abstract entity

@Entity({
  name: 'refresh_token',
})
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  public value: string;

  @Column()
  public accountId: number;

  @Column()
  public expiresAt: Date;

  @Column()
  public clientId: string;

  @Column()
  public ipAddress: string;
}
