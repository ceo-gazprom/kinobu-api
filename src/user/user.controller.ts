import {
  Controller,
  Inject,
  Get,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { USER_SERVICE } from './di.constant';
import { IUserService } from './interfaces';
import { UserDto } from './dto';

@Controller({
  version: '1',
  path: 'user',
})
@ApiTags('USER')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user data by user id',
    type: UserDto,
  })
  public async getUserById(@Param('userId') id: number): Promise<UserDto> {
    const user = await this.userService.getById(id);
    return UserDto.fromEntity(user);
  }
}
