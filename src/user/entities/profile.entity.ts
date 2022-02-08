import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common';

@Entity({
  name: 'profiles',
})
export class ProfileEntity extends AbstractEntity {
  @Column()
  public photo: string;

  @Column()
  public cover: string;
}
