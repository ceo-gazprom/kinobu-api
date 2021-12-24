import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { COMMENT_SERVICE } from './di.constant';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';

const providers: Provider[] = [
  {
    provide: COMMENT_SERVICE,
    useClass: CommentService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentController],
  providers: [...providers],
})
export class CommentModule {}
