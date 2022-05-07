import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';
import { UserPost } from './dto/user-post.dto';

@Injectable()
export class UserPostCommentsService {
  constructor(private pgService: PgService) {}


}
