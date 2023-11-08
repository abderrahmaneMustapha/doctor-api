import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Admin } from './admin/entities/admin.entity';
import { Doctor } from './doctor/entities/doctor.entity';
import { Patient } from './patient/entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async isTableEmpty(repository: Repository<any>): Promise<boolean> {
    const count = await repository.count();
    return count === 0;
  }

  async seedDatabase() {
    if (await this.isTableEmpty(this.adminRepository)) {
      // Seed Admins
      const admin1 = this.adminRepository.create({
        name: 'Admin One',
        email: 'admin1@example.com',
        password: 'password',
        type: 'admin',
      });

      const admin2 = this.adminRepository.create({
        name: 'Admin Two',
        email: 'admin2@example.com',
        password: 'password',
        type: 'admin',
      });

      await this.adminRepository.save([admin1, admin2]);
    }

    if (await this.isTableEmpty(this.doctorRepository)) {
      // Seed Doctors
      const doctorsData = [
        {
          name: 'Doctor One',
          email: 'doctor1@example.com',
          specialization: 'Cardiology',
        },
        {
          name: 'Doctor Two',
          email: 'doctor2@example.com',
          specialization: 'Neurology',
        },
        {
          name: 'Doctor Three',
          email: 'doctor3@example.com',
          specialization: 'Pediatrics',
        },
      ];

      const doctors = doctorsData.map((data) =>
        this.doctorRepository.create({
          ...data,
          password: 'password',
          type: 'doctor',
        }),
      );

      await this.doctorRepository.save(doctors);
    }

    if (await this.isTableEmpty(this.patientRepository)) {
      const patientsData = [
        {
          name: 'Patient One',
          email: 'patient1@example.com',
          dateOfBirth: '1980-01-01',
          address: '123 First St, Anytown, AN',
          type: 'patient',
        },
        {
          name: 'Patient Two',
          email: 'patient2@example.com',
          dateOfBirth: '1990-02-02',
          address: '456 Second St, Anytown, AN',
          type: 'patient',
        },
        {
          name: 'Patient Three',
          email: 'patient3@example.com',
          dateOfBirth: '2000-03-03',
          address: '789 Third St, Anytown, AN',
          type: 'patient',
        },
        {
          name: 'Patient Four',
          email: 'patient4@example.com',
          dateOfBirth: '1985-04-04',
          address: '101 Fourth St, Anytown, AN',
          type: 'patient',
        },
        {
          name: 'Patient Five',
          email: 'patient5@example.com',
          dateOfBirth: '1975-05-05',
          address: '202 Fifth St, Anytown, AN',
          type: 'patient',
        },
        {
          name: 'Patient Six',
          email: 'patient6@example.com',
          dateOfBirth: '1965-06-06',
          address: '303 Sixth St, Anytown, AN',
          type: 'patient',
        },
      ];
      const patients = patientsData.map((data) =>
        this.patientRepository.create({
          ...data,
          password: 'password',
          type: 'patient',
        }),
      );

      await this.patientRepository.save(patients);
    }
  }
}
