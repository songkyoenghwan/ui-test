import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { PoisModule } from '../pois/pois.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [PrismaModule, PoisModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
