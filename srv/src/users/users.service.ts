import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  // get list of all users
  async findAll(pageOptionsDto: PageOptionsDto): Promise<{ users: UsersEntity[]; pageMetaDto: PageMetaDto }> {
    const [users, itemCount] = await this.usersRepo.findAndCount({
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
    });
    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return { users, pageMetaDto };
  }
}
