import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { AbstractRepository } from '../../common';
import { EmailConfirmCodeEntity } from '../entities';
import type { IEmailConfirmCodeRepository } from '../interfaces';

@Injectable()
export class EmailConfirmCodeRepository
  extends AbstractRepository<EmailConfirmCodeEntity>
  implements IEmailConfirmCodeRepository
{
  constructor(
    @InjectRepository(EmailConfirmCodeEntity)
    private readonly accountRepository: Repository<EmailConfirmCodeEntity>,
  ) {
    super(accountRepository);
  }
}
