import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestResolver } from './quest.resolver';
import { PgModule } from 'src/pg/pg.module';

@Module({
  imports: [PgModule],
  providers: [QuestService, QuestResolver],
})
export class QuestModule {}
