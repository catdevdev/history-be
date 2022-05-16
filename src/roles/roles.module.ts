import { Module } from '@nestjs/common';
import { PgModule } from 'src/pg/pg.module';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';

@Module({
  imports: [PgModule],
  providers: [RolesResolver, RolesService],
})
export class RolesModule {}
