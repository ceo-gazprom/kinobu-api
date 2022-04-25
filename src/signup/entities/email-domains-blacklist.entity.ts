import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common';
import type { IEmailDomainsBlacklistEntity } from '../interfaces';

@Entity()
export class EmailDomainsBlacklistEntity
  extends AbstractEntity
  implements IEmailDomainsBlacklistEntity
{
  @Column()
  public domain: string;
}
