import { Module } from '@nestjs/common';
import { PgModule } from 'src/pg/pg.module';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesResolver, RolesService],
  imports: [PgModule],
})
export class RolesModule {}
