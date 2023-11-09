import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { History } from './entities/history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [TypeOrmModule.forFeature([History]), DoctorModule, PatientModule],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [TypeOrmModule.forFeature([History])],
})
export class HistoryModule {}
