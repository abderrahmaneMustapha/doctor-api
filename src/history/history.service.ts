import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto): Promise<History> {
    const History = this.historyRepository.create(createHistoryDto);
    return await this.historyRepository.save(History);
  }

  async findAll(): Promise<History[]> {
    return await this.historyRepository.find({
      relations: ['patient', 'doctor'],
    });
  }

  async findOne(id: string): Promise<History> {
    const History = await this.historyRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor'],
    });
    if (!History) {
      throw new NotFoundException(`History with ID ${id} not found`);
    }
    return History;
  }

  async update(
    id: string,
    updateHistoryDto: UpdateHistoryDto,
  ): Promise<History> {
    const History = await this.historyRepository.preload({
      id,
      ...updateHistoryDto,
    });

    if (!History) {
      throw new NotFoundException(`History with ID ${id} not found`);
    }

    return await this.historyRepository.save(History);
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
