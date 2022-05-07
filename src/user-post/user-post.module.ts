import { Module } from '@nestjs/common';
import { UserPostService } from './user-post.service';
import { UserPostController } from './user-post.controller';
import { PgModule } from 'src/pg/pg.module';
import { UserPostResolver } from './user-post.resolver';
import { UserPostCommentsService } from './user-post-comments.service';
import { UserPostCommentsResolver } from './user-post-comments.resolver';

@Module({
  providers: [
    UserPostService,
    UserPostResolver,
    UserPostCommentsService,
    UserPostCommentsResolver,
  ],
  controllers: [UserPostController],
  imports: [PgModule],
})
export class UserPostModule {}
