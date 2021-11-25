import { ApiProperty } from '@nestjs/swagger';
import type { MediaType } from '../../../constants';
import type { CommentEntity } from '../comment.entity';

export class CommentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  mediaType: MediaType;

  @ApiProperty()
  text: string;

  static fromEntity(commentEntity: CommentEntity): CommentDto {
    const comment = new CommentDto();

    comment.id = commentEntity.id;
    comment.userId = commentEntity.userId;
    comment.mediaType = commentEntity.mediaType;
    comment.text = commentEntity.text;

    return comment;
  }
}
