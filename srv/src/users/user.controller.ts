import { UserService } from './users.service';
import { ClassSerializerInterceptor, Controller, Get, Logger, Query, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsersResponseDto } from './users.response.dto';
import { PageDto, PageOptionsDto } from 'src/common/dtos';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query() pageOptionsDto: PageOptionsDto) {
    this.logger.log('Get all users');
    const { users, pageMetaDto } = await this.userService.findAll(pageOptionsDto);
    const responseUsers = plainToInstance(UsersResponseDto, users);
    return new PageDto(responseUsers, pageMetaDto);
  }
}
