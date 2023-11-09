import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { PatientModule } from 'src/patient/patient.module';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  providers: [AuthService],
  imports: [UserModule, PatientModule, DoctorModule],
  controllers: [AuthController],
})
export class AuthModule {}
