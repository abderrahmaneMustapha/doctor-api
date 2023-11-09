import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { DoctorService } from 'src/doctor/doctor.service';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
    private doctorService: DoctorService,
    private patientService: PatientService,
  ) {}

  async create(
    createPrescriptionDto: CreatePrescriptionDto,
  ): Promise<Prescription> {
    const prescription = this.prescriptionRepository.create(
      createPrescriptionDto,
    );

    if (createPrescriptionDto.doctorId) {
      const doctor = await this.doctorService.findOne(
        createPrescriptionDto.doctorId,
      );
      if (!doctor) {
        throw new NotFoundException(
          `Doctor with ID ${createPrescriptionDto.doctorId} not found`,
        );
      }
      prescription.doctor = doctor;
    }

    if (createPrescriptionDto.patientId) {
      const patient = await this.patientService.findOne(
        createPrescriptionDto.patientId,
      );
      if (!patient) {
        throw new NotFoundException(
          `Patient with ID ${createPrescriptionDto.patientId} not found`,
        );
      }
      prescription.patient = patient;
    }
    return await this.prescriptionRepository.save(prescription);
  }

  async findAll(): Promise<Prescription[]> {
    return await this.prescriptionRepository.find({
      relations: ['doctor', 'patient'],
    });
  }

  async findOne(id: string): Promise<Prescription> {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient'],
    });
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    return prescription;
  }

  async update(
    id: string,
    updatePrescriptionDto: UpdatePrescriptionDto,
  ): Promise<Prescription> {
    const prescription = await this.prescriptionRepository.preload({
      id: id,
      ...updatePrescriptionDto,
    });

    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }

    if (updatePrescriptionDto.doctorId) {
      const doctor = await this.doctorService.findOne(
        updatePrescriptionDto.doctorId,
      );
      if (!doctor) {
        throw new NotFoundException(
          `Doctor with ID ${updatePrescriptionDto.doctorId} not found`,
        );
      }
      prescription.doctor = doctor;
    }

    if (updatePrescriptionDto.patientId) {
      const patient = await this.patientService.findOne(
        updatePrescriptionDto.patientId,
      );
      if (!patient) {
        throw new NotFoundException(
          `Patient with ID ${updatePrescriptionDto.patientId} not found`,
        );
      }
      prescription.patient = patient;
    }

    return await this.prescriptionRepository.save(prescription);
  }

  async remove(id: string): Promise<void> {
    const result = await this.prescriptionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
  }

  async findPrescriptionsForPatient(patientId: string) {
    return this.prescriptionRepository.find({
      where: { patient: { id: patientId } },
      relations: ['patient', 'doctor'],
    });
  }

  async findPrescriptionForPatient(patientId: string, prescriptionId: string) {
    return this.prescriptionRepository.findOne({
      where: {
        id: prescriptionId,
        patient: { id: patientId },
      },
      relations: ['patient', 'doctor'],
    });
  }
}
