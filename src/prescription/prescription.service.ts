import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
  ) {}

  async create(
    createPrescriptionDto: CreatePrescriptionDto,
  ): Promise<Prescription> {
    const prescription = this.prescriptionRepository.create(
      createPrescriptionDto,
    );
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
    });
  }

  async findPrescriptionForPatient(patientId: string, prescriptionId: string) {
    return this.prescriptionRepository.findOne({
      where: {
        id: prescriptionId,
        patient: { id: patientId },
      },
    });
  }
}
