import { ApiProperty } from '@nestjs/swagger';
import { MediaType } from '../types';

export class CreateCommentDto {
  @ApiProperty({
    example: 'MOVIE',
    enum: MediaType,
  })
  mediaType: MediaType;

  @ApiProperty({
    example: 'Съешь же ещё этих мягких французских булок да выпей чаю',
  })
  text: string;
}
