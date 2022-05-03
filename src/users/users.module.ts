import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PgModule } from 'src/pg/pg.module';
import { UsersController } from './users.controller';

@Module({
  imports: [PgModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
