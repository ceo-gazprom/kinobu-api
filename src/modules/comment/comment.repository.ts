import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  /**
   *
   */
  public findCommentsByUserId(userId: number): Promise<CommentEntity[]> {
    return this.find({
      where: {
        userId,
      },
    });
  }
}
