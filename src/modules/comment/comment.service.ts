import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommentService } from './comment-service.interface';
import { CommentRepository } from './comment.repository';
import type { CommentEntity } from './comment.entity';

@Injectable() //implements ICommentService
export class CommentService {
  private readonly logger = new Logger(CommentService.name);

  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {}

  /**
   *
   */
  public getCommentsByUserId(userId: number): Promise<CommentEntity[]> {
    return this.commentRepository.findCommentsByUserId(userId);
  }
}
