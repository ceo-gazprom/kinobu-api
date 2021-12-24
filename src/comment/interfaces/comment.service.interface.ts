import type { CommentEntity } from '../comment.entity';

export interface ICommentService {
  getCommentsByUserId(userId: number): Promise<CommentEntity[]>;
  deleteCommentById(commentId: number): Promise<void>;
  restoreCommentById(commentId: number): Promise<CommentEntity>;
}
