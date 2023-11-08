import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { History } from './entities/history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [TypeOrmModule.forFeature([History])],
})
export class HistoryModule {}
