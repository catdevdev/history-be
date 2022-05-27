import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsResolver } from './statistics.resolver';
import { PgModule } from 'src/pg/pg.module';

@Module({
  imports: [PgModule],
  providers: [StatisticsService, StatisticsResolver],
  exports: [StatisticsService],
})
export class StatisticsModule {}
