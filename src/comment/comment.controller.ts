import {
  Controller,
  Logger,
  Inject,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { COMMENT_SERVICE } from './comment.constants';
import { ICommentService } from './interfaces';
import { CommentDto } from './dto';
import { JwtAuthGuard } from '../common/guards';

@Controller({
  version: '1',
  path: 'comment',
})
@ApiTags('COMMENTS')
export class CommentController {
  private readonly logger = new Logger(CommentController.name);
  constructor(
    @Inject(COMMENT_SERVICE) private readonly commentService: ICommentService,
  ) {}

  /**
   * Todo: добавить подтягивние данных пользователя к комментарию
   * Todo: Добавить пагинацию ( принимает количество тэлементов на странице и страницу, возвращает пагинацию)
   */
  @Get('user/:userId/list')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get comments list by user id',
    type: [CommentDto],
  })
  public async getCommentsByUserId(
    @Param('userId') userId: number,
  ): Promise<CommentDto[]> {
    const comments = await this.commentService.getCommentsByUserId(userId);
    return comments.map((comment) => CommentDto.fromEntity(comment));
  }

  /**
   * Todo: Сделать проверку что удаляет либо админ, либо модератор, либо хозяин
   * Todo: Вычесть рейтинг у пользователя
   */
  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  public async deleteCommentByID(
    @Param('commentId') commentId: number,
  ): Promise<void> {
    return await this.commentService.deleteCommentById(commentId);
  }

  /**
   * Todo: Сделать проверку что удаляет либо админ, либо модератор, либо хозяин
   * Todo: Восстановить рейтинг пользователя
   */
  @Post('restore/:commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  public async restoreCommentById(
    @Param('commentId') commentId: number,
  ): Promise<CommentDto> {
    const restoredComment = await this.commentService.restoreCommentById(
      commentId,
    );
    return CommentDto.fromEntity(restoredComment);
  }

  @Post('access/ban/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  public async banUser(): Promise<void> {
    return;
  }

  @Post('access/unban/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  public async unbanUser(@Param('userId') userId: number): Promise<void> {
    return;
  }
}
