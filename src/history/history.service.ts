import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { DoctorService } from 'src/doctor/doctor.service';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
    private doctorService: DoctorService,
    private patientService: PatientService,
  ) {}

  async create(createHistoryDto: CreateHistoryDto): Promise<History> {
    const history = this.historyRepository.create(createHistoryDto);

    if (createHistoryDto.doctorId) {
      const doctor = await this.doctorService.findOne(
        createHistoryDto.doctorId,
      );
      if (!doctor) {
        throw new NotFoundException(
          `Doctor with ID ${createHistoryDto.doctorId} not found`,
        );
      }
      history.doctor = doctor;
    }

    if (createHistoryDto.patientId) {
      const patient = await this.patientService.findOne(
        createHistoryDto.patientId,
      );
      if (!patient) {
        throw new NotFoundException(
          `Patient with ID ${createHistoryDto.patientId} not found`,
        );
      }
      history.patient = patient;
    }
    return await this.historyRepository.save(history);
  }

  async findAll(): Promise<History[]> {
    return await this.historyRepository.find({
      relations: ['patient', 'doctor'],
    });
  }

  async findOne(id: string): Promise<History> {
    const history = await this.historyRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor'],
    });
    if (!history) {
      throw new NotFoundException(`History with ID ${id} not found`);
    }
    return history;
  }

  async update(
    id: string,
    updateHistoryDto: UpdateHistoryDto,
  ): Promise<History> {
    const history = await this.historyRepository.preload({
      id,
      ...updateHistoryDto,
    });

    if (!history) {
      throw new NotFoundException(`History with ID ${id} not found`);
    }

    if (updateHistoryDto.doctorId) {
      const doctor = await this.doctorService.findOne(
        updateHistoryDto.doctorId,
      );
      if (!doctor) {
        throw new NotFoundException(
          `Doctor with ID ${updateHistoryDto.doctorId} not found`,
        );
      }
      history.doctor = doctor;
    }

    if (updateHistoryDto.patientId) {
      const patient = await this.patientService.findOne(
        updateHistoryDto.patientId,
      );
      if (!patient) {
        throw new NotFoundException(
          `Patient with ID ${updateHistoryDto.patientId} not found`,
        );
      }
      history.patient = patient;
    }

    return await this.historyRepository.save(history);
  }

  async remove(id: string): Promise<void> {
    const result = await this.historyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`History with ID ${id} not found`);
    }
  }

  async findHistoriesForPatient(patientId: string) {
    return this.historyRepository.find({
      where: { patient: { id: patientId } },
      relations: ['patient', 'doctor'],
    });
  }

  async findHistoryForPatient(patientId: string, historyId: string) {
    return this.historyRepository.findOne({
      where: {
        id: historyId,
        patient: { id: patientId },
      },
      relations: ['patient', 'doctor'],
    });
  }
}
