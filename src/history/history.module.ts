import { Module } from '@nestjs/common';
import { PgModule } from 'src/pg/pg.module';
import { HistoryService } from './history.service';
import { HistoryResolver } from './history.resolver';

@Module({
  providers: [HistoryService, HistoryResolver],
  imports: [PgModule],
})
export class HistoryModule {}
