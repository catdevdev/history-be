import { Module } from '@nestjs/common';
import { UserPostService } from './user-post.service';
import { UserPostController } from './user-post.controller';
import { PgModule } from 'src/pg/pg.module';

@Module({
  providers: [UserPostService],
  controllers: [UserPostController],
  imports: [PgModule],
})
export class UserPostModule {}
