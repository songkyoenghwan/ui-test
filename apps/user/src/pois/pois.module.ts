import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { PoisController } from './pois.controller';
import { PoisService } from './pois.service';

@Module({
  imports: [PrismaModule],
  controllers: [PoisController],
  providers: [PoisService],
  exports: [PoisService],
})
export class PoisModule {}
