import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'profiles',
})
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public photo: string;

  @Column()
  public cover: string;
}
