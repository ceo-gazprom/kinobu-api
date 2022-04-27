import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../core';

@Entity({
  name: 'worst_passwords',
})
export class WorstPasswordEntity extends AbstractEntity {
  @Column({ unique: true })
  public password: string;
}
