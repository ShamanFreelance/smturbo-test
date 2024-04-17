import { Exclude } from 'class-transformer';
import { UsersEntity } from './users.entity';

export class UsersResponseDto implements UsersEntity {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  updatedAt: Date;
  @Exclude()
  createdAt: Date;
}
