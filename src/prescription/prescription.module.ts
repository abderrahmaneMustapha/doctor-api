import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prescription]),
    DoctorModule,
    PatientModule,
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
  exports: [TypeOrmModule.forFeature([Prescription])],
})
export class PrescriptionModule {}
