import { Module } from '@nestjs/common';
import { PgModule } from 'src/pg/pg.module';
import { HistoryService } from './history.service';

@Module({
  providers: [HistoryService],
  imports: [PgModule],
})
export class HistoryModule {}
