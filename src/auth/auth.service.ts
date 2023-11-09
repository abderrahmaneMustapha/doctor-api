import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SigninDto } from './dto/sign-in-dto';
import { DoctorService } from 'src/doctor/doctor.service';
import { PatientService } from 'src/patient/patient.service';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { SignupDto } from './dto/sign-up-dto';
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private jwtService: JwtService,
  ) {}

  async signIn(credentials: SigninDto): Promise<{ access_token: string }> {
    const { password, email } = credentials;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const match = password === user.password;

    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = {
      email: user.email,
      name: user.name,
      type: user.type,
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }

  async signUp(createUserDto: SignupDto): Promise<Doctor | Patient> {
    const { userData, type } = createUserDto;

    switch (type) {
      case 'Doctor':
        return this.doctorService.create(userData as CreateDoctorDto);
      case 'Patient':
        return this.patientService.create(userData as CreatePatientDto);
      default:
        throw new Error('Invalid user type');
    }
  }
}
