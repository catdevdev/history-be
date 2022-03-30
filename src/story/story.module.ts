import { Module } from '@nestjs/common';
import { PgModule } from 'src/pg/pg.module';
import { StoryResolver } from './story.resolver';
import { StoryService } from './story.service';

@Module({
  providers: [StoryService, StoryResolver],
  imports: [PgModule],
})
export class StoryModule {}
