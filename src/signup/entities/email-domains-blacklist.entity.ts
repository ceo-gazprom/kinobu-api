import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../core';
import type { IEmailDomainsBlacklistEntity } from '../interfaces';

@Entity()
export class EmailDomainsBlacklistEntity
  extends AbstractEntity
  implements IEmailDomainsBlacklistEntity
{
  @Column()
  public domain: string;
}
