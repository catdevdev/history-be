import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoryModule } from './history/history.module';
import { PgService } from './pg/pg.service';
import { PgModule } from './pg/pg.module';

@Module({
  imports: [HistoryModule, PgModule],
  controllers: [AppController],
  providers: [AppService, PgService],
})
export class AppModule {}
